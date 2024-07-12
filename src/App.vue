<template>
  <LayoutHeader />
  <div class="layout__content">
    <LayoutAside v-if="$route.meta.haveAside" class="layout__content-aside" />
    <main class="layout__content-main">
      <RouterView />
    </main>
  </div>
</template>

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
  background-color: var(--bg-color);
}
</style>
