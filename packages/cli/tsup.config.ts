import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  noExternal: [
    'chalk',
    'commander',
    'execa',
    'fs-extra',
    'ora',
    'picocolors',
    'prompts',
  ],
});
