<template>
  <aside
    :aria-expanded="!isCollapse"
    class="w-[var(--aside-collapse-width)] aria-expanded:w-[var(--aside-expand-width)] bg-gray-50 dark:bg-gray-900/80 shadow p-5 box-border transition-width"
  >
    <nav>
      <div
        v-for="(item, index) in menuList"
        :aria-checked="$route.name === item.name"
        class="flex items-center m-y-3 p-3 cursor-pointer hover:text-primary-600 hover:bg-gray-100 aria-checked:text-primary-600 aria-checked:bg-gray-100 dark:hover:bg-primary-600/10 dark:aria-checked:bg-primary-600/10 rounded-md whitespace-nowrap transition-background-color transition-color"
        :key="index"
        :title="isCollapse ? item.label : ''"
        @click="$router.replace({ name: item.name })"
      >
        <i :class="['flex-shrink-0', 'block', item.icon]" />
        <span :aria-hidden="isCollapse" class="m-l-2 aria-hidden:opacity-0 transition-opacity">{{
          item.label
        }}</span>
      </div>
    </nav>
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
  { label: '总览', icon: 'i-ep:files', name: 'overview' },
  { label: '图片', icon: 'i-ep:picture', name: 'picture' },
  { label: '视频', icon: 'i-ep:video-camera', name: 'video' },
  { label: '下载', icon: 'i-ep:download', name: 'download' }
];
</script>
