// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png'], // Add PNG to assets
  server: {
    host: '0.0.0.0', // Expose the server to the network
    port: 4173, // Set the server to run on port 3000
    proxy: {
      '/api': {
        target: 'https://frappe-client1.sirfbill.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  }
});
