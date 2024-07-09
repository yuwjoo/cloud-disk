import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import postcssPxtorem from 'postcss-pxtorem';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

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
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('un-i-')
        }
      }
    }),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: getFilePath('./types/auto-imports.d.ts')
    }),
    Components({
      dirs: [getFilePath('./src/components')],
      extensions: ['vue', 'tsx'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: getFilePath('./types/components.d.ts')
    }),
    Unocss({
      configFile: getFilePath('./unocss.config.ts')
    })
  ],
  css: {
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 16, // 1rem等于多少px
          unitPrecision: 3, // 转rem精确到小数点多少位
          propList: ['*'], // 需要转换的属性，*表示所有
          selectorBlackList: ['ignore'], // 不进行px转换的选择器
          replace: true, // 是否直接更换属性值，而不添加备用属性
          mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
          minPixelValue: 0, // 设置要替换的最小像素值
          exclude: /node_modules/i // 排除node_modules文件夹下的文件
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/assets/styles/elementVariable.scss' as *;
          @use '@/assets/styles/function.scss' as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  }
});
