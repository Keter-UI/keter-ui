import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

type ProjectType = 'nextjs' | 'vite' | 'react' | 'unknown';
type PackageManager = 'pnpm' | 'yarn' | 'npm';

function detectProjectType(cwd: string): ProjectType {
  if (fs.existsSync(path.join(cwd, 'next.config.ts')) ||
      fs.existsSync(path.join(cwd, 'next.config.mjs')) ||
      fs.existsSync(path.join(cwd, 'next.config.js'))) {
    return 'nextjs';
  }
  if (fs.existsSync(path.join(cwd, 'vite.config.ts')) ||
      fs.existsSync(path.join(cwd, 'vite.config.js'))) {
    return 'vite';
  }
  const pkg = readPackageJson(cwd);
  if (pkg?.dependencies?.react || pkg?.devDependencies?.react) return 'react';
  return 'unknown';
}

function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

function readPackageJson(cwd: string): Record<string, any> | null {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  try {
    return fs.readJsonSync(pkgPath);
  } catch {
    return null;
  }
}

function log(symbol: string, message: string) {
  console.log(`${symbol} ${message}`);
}

function step(message: string) {
  console.log(chalk.cyan(`  → ${message}`));
}

function success(message: string) {
  console.log(chalk.green(`  ✓ ${message}`));
}

function warn(message: string) {
  console.log(chalk.yellow(`  ⚠ ${message}`));
}

export async function init() {
  const cwd = process.cwd();
  console.log('');
  console.log(chalk.bold.blue('  Keter UI — Initializing your project'));
  console.log(chalk.gray('  ─────────────────────────────────────'));
  console.log('');

  const projectType = detectProjectType(cwd);
  const pm = detectPackageManager(cwd);
  const pmInstall = pm === 'pnpm' ? 'pnpm add' : pm === 'yarn' ? 'yarn add' : 'npm install';
  const pmDevFlag = '--save-dev';

  log('📦', chalk.bold('Detected project:') + chalk.gray(` ${projectType} (${pm})`));
  console.log('');

  // 1. Install dependencies
  step('Installing Keter UI packages...');
  const deps = ['@keter-ui/react', '@keter-ui/core', '@keter-ui/tokens', '@keter-ui/rtl'];
  try {
    execSync(`${pmInstall} ${deps.join(' ')}`, { cwd, stdio: 'pipe' });
    success('Dependencies installed');
  } catch {
    warn('Could not auto-install packages. Run manually:');
    console.log(chalk.gray(`    ${pmInstall} ${deps.join(' ')}`));
  }

  // 2. Install dev dependencies
  step('Installing dev dependencies...');
  const devDeps = ['tailwindcss', 'clsx', 'tailwind-merge'];
  try {
    execSync(`${pmInstall} ${pmDevFlag} ${devDeps.join(' ')}`, { cwd, stdio: 'pipe' });
    success('Dev dependencies installed');
  } catch {
    warn('Could not auto-install dev packages.');
  }

  // 3. Inject tokens CSS
  step('Injecting design tokens...');
  await injectTokens(cwd, projectType);
  success('Design tokens injected');

  // 4. Configure Tailwind
  step('Configuring Tailwind CSS...');
  await configureTailwind(cwd, projectType);
  success('Tailwind configured');

  // 5. Create layout
  step('Creating base layout...');
  await createBaseLayout(cwd, projectType);
  success('Base layout created');

  console.log('');
  console.log(chalk.bold.green('  ✨ Keter UI initialized successfully!'));
  console.log('');
  console.log(chalk.gray('  Next steps:'));
  console.log(chalk.gray('    • Import @keter-ui/react components in your pages'));
  console.log(chalk.gray('    • Run: npx keter-ui add dashboard'));
  console.log(chalk.gray('    • Docs: https://keter-ui.dev/docs'));
  console.log('');
}

async function injectTokens(cwd: string, projectType: ProjectType) {
  const tokensCSS = `/* Keter UI Design Tokens */
@import '@keter-ui/tokens/css/tokens.css';
`;

  if (projectType === 'nextjs') {
    const globalsCSSPath = path.join(cwd, 'app', 'globals.css');
    const altPath = path.join(cwd, 'src', 'app', 'globals.css');
    const target = fs.existsSync(globalsCSSPath)
      ? globalsCSSPath
      : fs.existsSync(altPath)
      ? altPath
      : path.join(cwd, 'globals.css');

    if (fs.existsSync(target)) {
      const existing = await fs.readFile(target, 'utf-8');
      if (!existing.includes('@keter-ui/tokens')) {
        await fs.writeFile(target, tokensCSS + '\n' + existing);
      }
    } else {
      await fs.outputFile(target, tokensCSS + '\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
    }
  } else {
    const indexCSSPath = path.join(cwd, 'src', 'index.css');
    const altPath = path.join(cwd, 'index.css');
    const target = fs.existsSync(indexCSSPath) ? indexCSSPath : altPath;

    if (fs.existsSync(target)) {
      const existing = await fs.readFile(target, 'utf-8');
      if (!existing.includes('@keter-ui/tokens')) {
        await fs.writeFile(target, tokensCSS + '\n' + existing);
      }
    } else {
      await fs.outputFile(target, tokensCSS + '\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
    }
  }
}

async function configureTailwind(cwd: string, projectType: ProjectType) {
  const tailwindConfigPath = path.join(cwd, 'tailwind.config.ts');
  if (fs.existsSync(tailwindConfigPath)) return;

  const contentPaths =
    projectType === 'nextjs'
      ? `['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './node_modules/@keter-ui/react/dist/**/*.js']`
      : `['./src/**/*.{ts,tsx}', './index.html', './node_modules/@keter-ui/react/dist/**/*.js']`;

  const config = `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ${contentPaths},
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
        secondary: {
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
        },
        success: {
          50: 'var(--success-50)',
          500: 'var(--success-500)',
          600: 'var(--success-600)',
        },
        danger: {
          50: 'var(--danger-50)',
          500: 'var(--danger-500)',
          600: 'var(--danger-600)',
        },
        warning: {
          50: 'var(--warning-50)',
          500: 'var(--warning-500)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
    },
  },
  plugins: [],
};

export default config;
`;
  await fs.outputFile(tailwindConfigPath, config);
}

async function createBaseLayout(cwd: string, projectType: ProjectType) {
  if (projectType === 'nextjs') {
    await createNextjsLayout(cwd);
  } else {
    await createViteLayout(cwd);
  }
}

async function createNextjsLayout(cwd: string) {
  const layoutPath = path.join(cwd, 'components', 'keter-layout.tsx');
  if (fs.existsSync(layoutPath)) return;

  const content = `'use client';

import React, { useState } from 'react';
import { DashboardLayout, Sidebar, Topbar } from '@keter-ui/react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '⊞' },
  { label: 'Analytics', href: '/analytics', icon: '↗' },
  { label: 'Users', href: '/users', icon: '👤' },
  { label: 'Settings', href: '/settings', icon: '⚙' },
];

export function KeterLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar collapsed={collapsed}>
          <div className="flex items-center justify-between p-4 border-b border-secondary-100">
            {!collapsed && <span className="font-bold text-primary-600">Keter UI</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-secondary-100 text-secondary-500"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <span>{item.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </a>
            ))}
          </nav>
        </Sidebar>
      }
      topbar={
        <Topbar>
          <div className="flex items-center gap-4 w-full">
            <input
              placeholder="Search..."
              className="flex-1 max-w-sm h-9 px-3 rounded-md border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex items-center gap-3 ms-auto">
              <button className="relative p-2 rounded-md hover:bg-secondary-100">
                <span>🔔</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                K
              </div>
            </div>
          </div>
        </Topbar>
      }
    >
      {children}
    </DashboardLayout>
  );
}
`;
  await fs.outputFile(layoutPath, content);
}

async function createViteLayout(cwd: string) {
  const layoutPath = path.join(cwd, 'src', 'components', 'KeterLayout.tsx');
  if (fs.existsSync(layoutPath)) return;

  const content = `import React, { useState } from 'react';
import { DashboardLayout, Sidebar, Topbar } from '@keter-ui/react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '⊞' },
  { label: 'Analytics', href: '/analytics', icon: '↗' },
  { label: 'Users', href: '/users', icon: '👤' },
  { label: 'Settings', href: '/settings', icon: '⚙' },
];

export function KeterLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar collapsed={collapsed}>
          <div className="flex items-center justify-between p-4 border-b border-secondary-100">
            {!collapsed && <span className="font-bold text-primary-600">Keter UI</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-secondary-100 text-secondary-500"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <span>{item.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </a>
            ))}
          </nav>
        </Sidebar>
      }
      topbar={
        <Topbar>
          <div className="flex items-center gap-4 w-full">
            <input
              placeholder="Search..."
              className="flex-1 max-w-sm h-9 px-3 rounded-md border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex items-center gap-3 ms-auto">
              <button className="relative p-2 rounded-md hover:bg-secondary-100">🔔</button>
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">K</div>
            </div>
          </div>
        </Topbar>
      }
    >
      {children}
    </DashboardLayout>
  );
}
`;
  await fs.outputFile(layoutPath, content);
}
