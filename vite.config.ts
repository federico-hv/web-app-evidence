/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
  // Load app-level env vars to node-level env vars.
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), ''),
  };

  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_APP_BASE_URL,
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setup.ts'],
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
    resolve: {
      alias: [
        {
          find: 'hooks',
          replacement: path.resolve(__dirname, './src/hooks'),
        },
        {
          find: 'layouts',
          replacement: path.resolve(__dirname, './src/layouts'),
        },
        {
          find: 'utilities',
          replacement: path.resolve(__dirname, './src/utilities'),
        },
        { find: 'lib', replacement: path.resolve(__dirname, './src/lib') },
        {
          find: 'pages',
          replacement: path.resolve(__dirname, './src/pages'),
        },
        {
          find: 'contexts',
          replacement: path.resolve(__dirname, './src/contexts'),
        },
        {
          find: 'configs',
          replacement: path.resolve(__dirname, './src/configs'),
        },
        {
          find: 'components',
          replacement: path.resolve(__dirname, './src/components'),
        },
        {
          find: 'shared',
          replacement: path.resolve(__dirname, './src/shared'),
        },
        {
          find: 'assets',
          replacement: path.resolve(__dirname, './src/assets'),
        },
      ],
    },
  });
};
