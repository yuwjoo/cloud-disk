import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { default as vueJsx } from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { initAutoImport, initComponents, initIcons } from "./builder/vitePlugins";
import { toFilePath } from "./builder/common";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), vueJsx(), VueDevTools(), VueSetupExtend(), initAutoImport(), initComponents(), initIcons()],
  css: {
    preprocessorOptions: {
      scss: {
        // 使用新版scss api
        api: "modern-compiler",
        additionalData: `@use "@/assets/styles/utils/color.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      "@": toFilePath("./src")
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  }
});
