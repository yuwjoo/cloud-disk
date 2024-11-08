<!--
 * @FileName: 布局
 * @FilePath: \cloud-disk\src\renderer\layout\Layout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-11-08 17:09:56
 * @Description: 
-->
<template>
  <layout-desktop-header v-if="isDesktop" />
  <layout-header />
  <div class="control-layout__content">
    <layout-aside v-if="$route.meta.aside" class="control-layout__aside" />
    <main class="control-layout__main">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>

  <task-drawer v-if="userStore.isLogin" />
</template>

<script setup lang="ts" name="LayoutView">
import LayoutDesktopHeader from './components/LayoutDesktopHeader.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import TaskDrawer from './components/TaskDrawer.vue';
import { useUserStore } from '@/store/user';
import { isDesktop } from '@/hooks/electron';

const userStore = useUserStore(); // 用户仓库
</script>

<style lang="scss" scoped>
.control-layout__content {
  display: flex;
  height: calc(100vh - 94px);
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
