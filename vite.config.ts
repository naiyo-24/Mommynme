// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png'], // Add PNG to assets
  server: {
    proxy: {
      '/api': {
        target: 'https://frappe-client1.sirfbill.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
