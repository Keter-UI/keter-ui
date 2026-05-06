import fs from 'fs-extra';
import path from 'path';

export type Framework = 'next' | 'vite-react' | 'vite' | 'remix' | 'astro' | 'unknown';

export async function detectFramework(cwd: string): Promise<Framework> {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return 'unknown';

  const pkg = await fs.readJson(pkgPath).catch(() => ({}));
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  if (deps['next']) return 'next';
  if (deps['@remix-run/react'] || deps['@remix-run/node']) return 'remix';
  if (deps['astro']) return 'astro';

  const hasVite = deps['vite'] || fs.existsSync(path.join(cwd, 'vite.config.ts')) || fs.existsSync(path.join(cwd, 'vite.config.js'));
  if (hasVite && deps['react']) return 'vite-react';
  if (hasVite) return 'vite';

  return 'unknown';
}

export function frameworkLabel(f: Framework): string {
  const map: Record<Framework, string> = {
    next:       'Next.js',
    'vite-react': 'Vite + React',
    vite:       'Vite',
    remix:      'Remix',
    astro:      'Astro',
    unknown:    'Unknown',
  };
  return map[f];
}

export function isTypeScriptProject(cwd: string): boolean {
  return (
    fs.existsSync(path.join(cwd, 'tsconfig.json')) ||
    fs.existsSync(path.join(cwd, 'tsconfig.app.json'))
  );
}

export function detectPackageManager(cwd: string): 'pnpm' | 'yarn' | 'npm' | 'bun' {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}
