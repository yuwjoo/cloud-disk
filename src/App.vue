<template>
  <common-header v-model:is-collapse="isCollapse" :show-collapse-btn="$route.meta.haveAside" />
  <div class="flex h-[calc(100vh-var(--header-height))]">
    <common-aside v-if="$route.meta.haveAside" class="flex-shrink-0" :is-collapse="isCollapse" />
    <main class="flex-grow-1 dark:bg-gray-900 p-5 box-border">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
const CommonAside = defineAsyncComponent(() => import('@/components/layout/CommonAside.vue'));
const isCollapse = ref<boolean>(false); // 是否折叠侧边栏
</script>
