import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';
import { logger } from '../utils/logger.js';
import { detectFramework, detectPackageManager, frameworkLabel, isTypeScriptProject } from '../utils/detect-framework.js';
import { fetchRegistry, copyRegistryFile } from '../utils/registry.js';

const DEV_DEPS = ['tailwindcss', '@tailwindcss/vite', 'autoprefixer'];

export async function runInit(opts: { cwd?: string; yes?: boolean }) {
  const cwd = opts.cwd ? path.resolve(opts.cwd) : process.cwd();

  const framework = await detectFramework(cwd);
  const pm = detectPackageManager(cwd);
  const isTS = isTypeScriptProject(cwd);

  logger.info(`Detected: ${frameworkLabel(framework)}`);
  logger.info(`Package manager: ${pm}`);
  logger.info(`TypeScript: ${isTS ? 'yes' : 'no'}`);
  logger.break();

  const { confirm } = opts.yes
    ? { confirm: true }
    : await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Initialize Keter UI in this project?`,
        initial: true,
      });

  if (!confirm) {
    logger.warn('Aborted.');
    return;
  }

  // ── 1. Fetch Registry ─────────────────────────────────────────────────────
  
  const registrySpinner = ora('Fetching registry…').start();
  let registry;
  try {
    registry = await fetchRegistry();
    registrySpinner.succeed('Registry metadata fetched.');
  } catch (err) {
    registrySpinner.fail('Failed to fetch registry.');
    logger.error(String(err));
    return;
  }

  // ── 2. Install external dependencies ──────────────────────────────────────

  const installSpinner = ora('Installing dependencies…').start();
  try {
    const deps = ['clsx', 'tailwind-merge', 'class-variance-authority', 'react-hook-form'];
    const installArgs = pm === 'npm' ? ['install'] : pm === 'pnpm' ? ['add'] : ['add'];
    await execa(pm, [...installArgs, ...deps], { cwd });
    installSpinner.succeed('Dependencies installed.');
  } catch (err) {
    installSpinner.fail('Failed to install dependencies.');
    logger.error(String(err));
    return;
  }

  // ── 3. Setup Base Utilities (cn, etc.) ───────────────────────────────────

  const utilSpinner = ora('Setting up base utilities…').start();
  try {
    const cnUtil = registry.utilities.cn;
    if (cnUtil) {
      for (const file of cnUtil.files) {
        const targetPath = path.join(cwd, 'src', file);
        await copyRegistryFile(file, targetPath);
      }
    }
    utilSpinner.succeed('Base utilities configured.');
  } catch (err) {
    utilSpinner.fail('Failed to setup utilities.');
    logger.error(String(err));
  }

  // ── 4. Write tokens CSS ─────────────────────────────────────────────────────

  const cssDir = path.join(cwd, 'src', 'styles');
  await fs.ensureDir(cssDir);

  const globalCssPath = path.join(cssDir, 'globals.css');
  if (!fs.existsSync(globalCssPath)) {
    await fs.writeFile(
      globalCssPath,
      `@import 'tailwindcss';\n\n@layer base {\n  * {\n    box-sizing: border-box;\n  }\n  body {\n    font-family: var(--font-sans);\n    background-color: var(--bg-base);\n    color: var(--fg-base);\n  }\n}\n`
    );
    logger.success(`Created src/styles/globals.css`);
  }

  // ── 3. Write keter.config file ─────────────────────────────────────────────

  const ext = isTS ? 'ts' : 'js';
  const configPath = path.join(cwd, `keter.config.${ext}`);
  if (!fs.existsSync(configPath)) {
    await fs.writeFile(
      configPath,
      `/** @type {import('@keter-ui/core').KeterConfig} */\nexport default {\n  rtl: true,\n  theme: 'system',\n  primaryColor: 'brand',\n};\n`
    );
    logger.success(`Created keter.config.${ext}`);
  }

  // ── 4. Framework-specific setup ───────────────────────────────────────────

  if (framework === 'next') {
    await setupNext(cwd, isTS);
  } else if (framework === 'vite-react') {
    await setupVite(cwd, isTS);
  }

  // ── Done ──────────────────────────────────────────────────────────────────

  logger.break();
  logger.success('Keter UI initialized!');
  logger.break();
  logger.log('Next steps:');
  logger.log('  1. Import styles in your root layout:');
  logger.log('     import "./src/styles/globals.css"');
  logger.log('');
  logger.log('  2. Use components:');
  logger.log("     import { Button } from '@keter-ui/react'");
  logger.log('');
  logger.log('  3. For RTL support, wrap with KeterProvider and set locale:');
  logger.log("     <KeterProvider locale=\"he\">...</KeterProvider>");
  logger.break();
}

async function setupNext(cwd: string, isTS: boolean) {
  // Check if providers are set up
  const layoutPath = path.join(cwd, 'app', `layout.${isTS ? 'tsx' : 'jsx'}`);
  if (fs.existsSync(layoutPath)) {
    logger.info(`Found ${path.relative(cwd, layoutPath)} — add KeterProvider manually.`);
  }
}

async function setupVite(cwd: string, isTS: boolean) {
  const mainPath = path.join(cwd, 'src', `main.${isTS ? 'tsx' : 'jsx'}`);
  if (fs.existsSync(mainPath)) {
    logger.info(`Found ${path.relative(cwd, mainPath)} — add KeterProvider manually.`);
  }
}
