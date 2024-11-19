<!--
 * @FileName: 布局
 * @FilePath: \cloud-disk\src\renderer\layout\Layout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-11-08 17:30:40
 * @Description: 
-->
<template>
  <div class="layout">
    <LayoutDesktopHeader v-if="isDesktop" />
    <LayoutHeader />
    <div class="layout__content">
      <LayoutAside v-if="$route.meta.aside" class="layout__aside" />
      <main class="layout__main">
        <RouterView v-slot="{ Component }">
          <KeepAlive v-if="$route.meta.KeepAlive">
            <Component :is="Component" />
          </KeepAlive>
          <Component v-else :is="Component" />
        </RouterView>
      </main>
    </div>
  </div>

  <TaskDrawer v-if="userStore.isLogin" />
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
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .layout__content {
    display: flex;
    height: 0;
    flex-grow: 1;

    .layout__aside {
      flex-shrink: 0;
    }

    .layout__main {
      flex-grow: 1;
      box-sizing: border-box;
      padding: var(--spacing-medium);
      background-color: var(--bg-color);
    }
  }
}
</style>
