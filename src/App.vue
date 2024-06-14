<template>
  <LayoutCommonHeader v-model:is-collapse="isCollapse" :show-collapse-btn="$route.meta.haveAside" />
  <div class="flex h-[calc(100vh-var(--header-height))]">
    <LayoutCommonAside
      v-if="$route.meta.haveAside"
      class="flex-shrink-0"
      :is-collapse="isCollapse"
    />
    <main class="flex-grow-1 dark:bg-gray-900 p-5 box-border">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
const LayoutCommonAside = defineAsyncComponent(
  () => import('@/components/view/LayoutCommonAside.vue')
);
const isCollapse = ref<boolean>(true); // 是否折叠侧边栏
</script>
