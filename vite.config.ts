import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';

/**
 * @description: 获取文件路径
 * @param {string} fileUrl 文件url
 * @return {string} 文件路径
 */
function getFilePath(fileUrl: string): string {
  return fileURLToPath(new URL(fileUrl, import.meta.url));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [],
      dts: getFilePath('./types/auto-imports.d.ts')
    }),
    Components({
      dirs: [getFilePath('./src/components')],
      extensions: ['vue', 'tsx'],
      resolvers: [],
      dts: getFilePath('./types/components.d.ts')
    }),
    Unocss({
      configFile: getFilePath('./unocss.config.ts')
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
