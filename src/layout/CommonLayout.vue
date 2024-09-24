<!--
 * @FileName: 基本布局
 * @FilePath: \cloud-disk\src\layout\CommonLayout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-09-24 11:04:17
 * @Description: 
-->
<template>
  <LayoutHeader />
  <div class="control-layout__content">
    <LayoutAside class="control-layout__aside" />
    <main class="control-layout__main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>

  <LayoutTaskDrawer />
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import LayoutTaskDrawer from './components/LayoutTaskDrawer.vue';
</script>

<style lang="scss" scoped>
.control-layout__content {
  display: flex;
  height: calc(100vh - 64px);
}

.control-layout__aside {
  flex-shrink: 0;
}

.control-layout__main {
  flex-grow: 1;
  box-sizing: border-box;
  padding: var(--spacing-medium);
  background-color: var(--bg-color);
}
</style>
