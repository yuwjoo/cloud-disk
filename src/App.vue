<template>
  <LayoutHeader />
  <div class="layout__content">
    <LayoutAside v-if="$route.meta.haveAside" class="layout__content-aside" />
    <main class="layout__content-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
const LayoutAside = defineAsyncComponent(() => import('@/components/layout/LayoutAside.vue'));
</script>

<style lang="scss" scoped>
.layout__content {
  display: flex;
  height: calc(100vh - 64px);
}

.layout__content-aside {
  flex-shrink: 0;
}

.layout__content-main {
  flex-grow: 1;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--light-main-bg-color);
}

:root.dark {
  .layout__content-main {
    background-color: var(--dark-main-bg-color);
  }
}
</style>
