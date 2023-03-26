import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          d3: ['d3'],
          react: ['react'],
          'react-dom/client': ['react-dom/client'],
        },
      },
    },
  },
});
