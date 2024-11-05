import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      common: fileURLToPath(new URL('./src/common', import.meta.url)),
      '@': fileURLToPath(new URL('./src/main', import.meta.url))
    }
  }
});
