<template>
  <header
    class="flex items-center justify-between box-border p-x-5 h-[var(--header-height)] shadow dark:shadow-black/10 relative z-1  bg-primary-600 dark:bg-gray-900 text-gray-100"
  >
    <div class="flex items-center">
      <div v-if="showCollapseBtn" class="text-5.5 cursor-pointer m-r-8" @click="toggleCollapse()">
        <i :aria-expanded="!isCollapse" class="block i-ep:expand aria-expanded:i-ep:fold" />
      </div>
      <div class="flex items-center dark:text-primary-600">
        <i class="text-6 i-custom:logo" />
        <span class="text-4.5 m-l-2 font-bold">cloud-disk</span>
      </div>
    </div>
    <div class="flex items-center">
      <div class="text-5.5 cursor-pointer" @click="themeStore.toggleDark($event)">
        <i :aria-pressed="themeStore.isDark" class="block i-ep:sunny aria-pressed:i-ep:moon aria-pressed:text-5" />
      </div>
      <div
        class="text-4 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-900 hover:text-primary-600 m-l-8"
      >
        <i class="block i-ep:user" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/hooks/theme';

defineProps({
  // 展示侧边栏展开按钮
  showCollapseBtn: {
    type: Boolean,
    default: false
  }
});

const themeStore = useThemeStore();
const isCollapse = defineModel('isCollapse', { default: false }); // 是否折叠侧边栏

/**
 * @description: 切换侧边栏折叠状态
 */
function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>
