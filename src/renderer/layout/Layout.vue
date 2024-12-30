<!--
 * @FileName: 布局
 * @FilePath: \cloud-disk\src\renderer\layout\Layout.vue
 * @Author: YH
 * @Date: 2024-07-15 13:40:29
 * @LastEditors: YH
 * @LastEditTime: 2024-12-27 16:49:57
 * @Description: 
-->
<template>
  <div class="layout">
    <LayoutDesktopHeader v-if="isDesktop" />
    <!-- <LayoutHeader /> -->
    <div class="layout__content">
      <LayoutAside v-if="$route.meta.aside" class="layout__aside" />
      <main class="layout__main">
        <div>
          <RouterView v-slot="{ Component }">
            <!-- <Transition
            name="page"
            enter-active-class="animate__animated animate__backInRight"
            leave-active-class="animate__animated animate__backOutLeft"
            mode="out-in"
          > -->
            <KeepAlive v-if="$route.meta.KeepAlive">
              <Component :is="Component" />
            </KeepAlive>
            <Component v-else :is="Component" />
            <!-- </Transition> -->
          </RouterView>
        </div>
      </main>
    </div>
  </div>

  <TaskDrawer v-if="userStore.isLogin" />
</template>

<script setup lang="ts" name="LayoutView">
import LayoutDesktopHeader from './components/LayoutDesktopHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import TaskDrawer from './components/TaskDrawer.vue';
import { useUserStore } from '@/store/user';
import { isDesktop } from '@/hooks/electron';

const userStore = useUserStore(); // 用户仓库
</script>

<style lang="scss" scoped>
// .animate__animated {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }

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
      // overflow: hidden;
      // position: relative;

      > div {
        height: 100%;
        view-transition-name: main;
      }
    }
  }
}
</style>
