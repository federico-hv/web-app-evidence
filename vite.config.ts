/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    ],
  },
});
