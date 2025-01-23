import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
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
    VueSetupExtend(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: fileURLToPath(new URL('./src/renderer/types/autoImports.d.ts', import.meta.url))
    }),
    Components({
      dirs: [fileURLToPath(new URL('./src/renderer/components', import.meta.url))],
      extensions: ['vue', 'tsx'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['ep', 'tabler'],
          customCollections: ['icons']
        })
      ],
      dts: fileURLToPath(new URL('./src/renderer/types/components.d.ts', import.meta.url))
    }),
    Icons({
      customCollections: {
        icons: FileSystemIconLoader('./src/renderer/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" width="1em" height="1em" ')
        )
      },
      iconCustomizer(_collection, _icon, props) {
        props.width = '1em';
        props.height = '1em';
      },
      autoInstall: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用新版api
      }
    }
  },
  resolve: {
    alias: {
      common: fileURLToPath(new URL('./src/common', import.meta.url)),
      '@': fileURLToPath(new URL('./src/renderer', import.meta.url))
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  }
});
