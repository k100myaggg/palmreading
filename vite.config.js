import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scanner: resolve(__dirname, 'scanner.html'),
        report: resolve(__dirname, 'report.html'),
        palmists: resolve(__dirname, 'palmists.html'),
        guides: resolve(__dirname, 'guides.html')
      }
    }
  },
  server: {
    port: 5173,
    open: false
  }
});
