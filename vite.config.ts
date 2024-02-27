/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
  // Load app-level env vars to node-level env vars.
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), ''),
  };

  return defineConfig({
    plugins: [react()],
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
  });
};
