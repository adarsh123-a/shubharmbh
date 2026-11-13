import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: '../',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/eformx-api': {
        target: 'https://api.eformx.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/eformx-api/, ''),
      },
    },
  },
});
