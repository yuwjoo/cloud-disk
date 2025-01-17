<!--
 * @FileName: 桌面端窗口界面
 * @FilePath: \cloud-disk\src\renderer\views\desktopWindow\DesktopWindow.vue
 * @Author: YH
 * @Date: 2025-01-08 10:03:29
 * @LastEditors: YH
 * @LastEditTime: 2025-01-17 13:22:47
 * @Description: 
-->
<template>
  <div class="desktop-window-titlebar"></div>
  <iframe
    class="desktop-window-iframe"
    :src="target"
    sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-to-custom-protocols"
  />
</template>

<script setup lang="ts" name="DesktopWindowView">
import { useRoute } from 'vue-router';

const target = useRoute().query.target as string; // web页面地址
</script>

<style lang="scss" scoped>
$titleBarHeight: 35px; // 标题栏高度

.desktop-window-titlebar {
  -webkit-app-region: drag;
  height: $titleBarHeight;
  background-color: rgb(250, 250, 250);
}

.desktop-window-iframe {
  display: block;
  border: none;
  width: 100%;
  height: calc(100vh - $titleBarHeight);
}
</style>
