import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src/client',
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
  },
  envDir: '../../', //resolve(__dirname),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/client/components'),
      '@/utils': resolve(__dirname, './src/shared/utils'),
      '@/types': resolve(__dirname, './src/shared/types'),
    },
  },
  server: {
    host: '0.0.0.0', // Required for Docker containers
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
