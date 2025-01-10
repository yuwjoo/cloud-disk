<template>
  <div class="desktop-window-titlebar"></div>
  <iframe class="desktop-window-iframe" src="/" />
</template>

<script setup lang="ts" name="DesktopWindowView"></script>

<style lang="scss" scoped>
.desktop-window-titlebar {
  -webkit-app-region: drag;
  height: 35px;
  background-color: rgb(250, 250, 250);
}

.desktop-window-iframe {
  display: block;
  border: none;
  width: 100%;
  height: calc(100vh - 35px);
}
</style>
