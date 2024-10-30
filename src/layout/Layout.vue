<!--
 * @FileName: 布局
 * @FilePath: \cloud-disk\src\layout\Layout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-10-30 16:55:27
 * @Description: 
-->
<template>
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
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import TaskDrawer from './components/TaskDrawer.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore(); // 用户仓库
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
