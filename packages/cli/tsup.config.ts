import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  minify: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  // Ensure we don't bundle external dependencies that should be handled by the user's PM
  external: ['commander', 'execa', 'fs-extra', 'ora', 'picocolors', 'prompts', 'chalk'],
});
