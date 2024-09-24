<!--
 * @FileName: 布局-其他页面
 * @FilePath: \cloud-disk\src\layouts\other\OtherLayout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-07-15 14:06:42
 * @Description: 
-->
<template>
  <LayoutHeader />
  <div class="other-layout__content">
    <main class="other-layout__main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue';
</script>

<style lang="scss" scoped>
.other-layout__content {
  height: calc(100vh - 64px);
}

.other-layout__main {
  box-sizing: border-box;
  padding: var(--spacing-medium);
  background-color: var(--bg-color);
}
</style>
