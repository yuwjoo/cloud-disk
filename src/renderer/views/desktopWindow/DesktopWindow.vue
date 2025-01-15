<!--
 * @FileName: 桌面端窗口界面
 * @FilePath: \cloud-disk\src\renderer\views\desktopWindow\DesktopWindow.vue
 * @Author: YH
 * @Date: 2025-01-08 10:03:29
 * @LastEditors: YH
 * @LastEditTime: 2025-01-15 16:04:34
 * @Description: 
-->
<template>
  <div class="desktop-window-titlebar"></div>
  <iframe class="desktop-window-iframe" :src="webUrl" @load="handleLoad" />
</template>

<script setup lang="ts" name="DesktopWindowView">
import { useRoute } from 'vue-router';

const webUrl = useRoute().query.url as string; // web页面地址

console.log({ webUrl }, useRoute());

/**
 * @description: 处理iframe加载
 * @param {Event} ev 加载事件
 */
const handleLoad = (ev: Event) => {
  const contentWindow = (ev.target as HTMLIFrameElement).contentWindow;
  if (contentWindow) contentWindow.electronApi = window.electronApi;
};
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
