import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        // Resolve workspace packages from source during dev (before build)
        '@keter-ui/core':   path.resolve(__dirname, '../../packages/core/src/index.ts'),
        '@keter-ui/tokens': path.resolve(__dirname, '../../packages/tokens/src/index.ts'),
        '@keter-ui/rtl':    path.resolve(__dirname, '../../packages/rtl/src/index.ts'),
        '@keter-ui/react':  path.resolve(__dirname, '../../packages/react/src/index.ts'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
