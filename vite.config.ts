import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [],
      dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
    }),
    Components({
      resolvers: [],
      dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
    }),
    Unocss({
      configFile: fileURLToPath(new URL('./unocss.config.ts', import.meta.url))
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  }
});
