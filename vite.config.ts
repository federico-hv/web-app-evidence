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
      host: true, // needed for docker port mapping to work
      strictPort: true,
      port: 5174,
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
          find: 'layout',
          replacement: path.resolve(__dirname, './src/layout'),
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
          find: 'component',
          replacement: path.resolve(__dirname, './src/react'),
        },
        {
          find: 'shared',
          replacement: path.resolve(__dirname, './src/shared'),
        },
        {
          find: 'assets',
          replacement: path.resolve(__dirname, './src/assets'),
        },
        {
          find: 'content',
          replacement: path.resolve(__dirname, './src/content'),
        },
      ],
    },
  });
};
