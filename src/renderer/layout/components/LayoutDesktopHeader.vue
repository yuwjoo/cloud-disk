<template>
  <div class="layout-desktop-header">
    <i-icons-minimize
      class="layout-desktop-header__control"
      @click="electronApi.window.minimize()"
    />
    <i-icons-restore
      v-if="isMaximize"
      class="layout-desktop-header__control"
      @click="electronApi.window.restore()"
    />
    <i-icons-maximize
      v-else
      class="layout-desktop-header__control"
      @click="electronApi.window.maximize()"
    />
    <i-icons-close class="layout-desktop-header__control" @click="electronApi.window.close()" />
  </div>
</template>

<script setup lang="ts" name="LayoutDesktopHeader">
import { useAddListener, useElectronApi } from '@/hooks/electron';

const electronApi = useElectronApi();

const isMaximize = ref(electronApi.window.isMaximize()); // 是否最大化

useAddListener('window-change-maximize', (_event, is) => {
  isMaximize.value = is;
});
</script>

<style lang="scss">
.layout-desktop-header {
  -webkit-app-region: drag;
  display: flex;
  justify-content: flex-end;
  height: 30px;
  background-color: var(--bg-color-nav);

  .layout-desktop-header__control {
    -webkit-app-region: no-drag;
    height: 100%;
    padding: 0 var(--spacing-medium);
    position: relative;
    z-index: 9999;

    &:hover {
      background-color: var(--color-info-light-7);
    }

    &:last-child:hover {
      background-color: rgba(255, 0, 0, 0.8);
    }
  }
}
</style>
