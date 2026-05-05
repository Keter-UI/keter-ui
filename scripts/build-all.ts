/**
 * Build all packages in dependency order.
 * Usage: npx tsx scripts/build-all.ts
 */

import { execSync } from 'child_process';

const PACKAGES = ['tokens', 'core', 'rtl', 'react', 'cli'];

function run(cmd: string, label: string) {
  console.log(`\n  → ${label}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`  ✓ ${label}`);
  } catch (e) {
    console.error(`  ✗ ${label} failed`);
    process.exit(1);
  }
}

console.log('\n  Keter UI — Building all packages');
console.log('  ──────────────────────────────────\n');

for (const pkg of PACKAGES) {
  run(`pnpm --filter @keter-ui/${pkg} build`, `@keter-ui/${pkg}`);
}

console.log('\n  All packages built successfully.\n');
