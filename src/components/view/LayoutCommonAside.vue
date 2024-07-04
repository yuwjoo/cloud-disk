<template>
  <aside
    :aria-expanded="!isCollapse"
    class="relative w-[var(--aside-collapse-width)] aria-expanded:w-[var(--aside-expand-width)] bg-gray-50 p-t-5 dark:bg-gray-900/80 shadow box-border transition-width"
  >
    <nav>
      <div
        v-for="(item, index) in menuList"
        :aria-checked="$route.name === item.name"
        class="flex items-center m-b-3 m-x-5 p-3 cursor-pointer hover:text-primary-600 hover:bg-gray-100 aria-checked:text-primary-600 aria-checked:bg-gray-100 dark:hover:bg-primary-600/10 dark:aria-checked:bg-primary-600/10 rounded-md whitespace-nowrap transition-background-color transition-color"
        :key="index"
        :title="isCollapse ? item.label : ''"
        @click="$router.replace({ name: item.name })"
      >
        <i :class="['flex-shrink-0', item.icon]" />
        <span :aria-hidden="isCollapse" class="m-l-2 aria-hidden:opacity-0 transition-opacity">{{
          item.label
        }}</span>
      </div>
    </nav>
    <div
      class="flex items-center w-full cursor-pointer box-border p-x-8 p-y-5 border-t border-t-solid border-t-gray-200 dark:border-t-gray-800/50 absolute bottom-0 whitespace-nowrap transition-background-color transition-color hover:text-primary-600"
    >
      <i class="flex-shrink-0 i-ep:setting" />
      <span :aria-hidden="isCollapse" class="m-l-2 aria-hidden:opacity-0 transition-opacity"
        >设置</span
      >
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
});

const menuList = [
  { label: '总览', icon: 'i-ep-reading', name: 'overview' },
  { label: '图片', icon: 'i-ep:picture', name: 'picture' },
  { label: '视频', icon: 'i-ep:video-camera', name: 'video' },
  { label: '任务中心', icon: 'i-ep:cpu', name: 'download' }
];
</script>
