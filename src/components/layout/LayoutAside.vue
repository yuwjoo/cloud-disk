<template>
  <aside class="aside-menu" :class="{ 'aside-menu--collapsed': isCollapsed }">
    <nav class="aside-menu__nav">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        :class="['aside-menu__item', { 'aside-menu__item--active': $route.name === item.name }]"
        :title="isCollapsed ? item.label : ''"
        @click="$router.replace({ name: item.name })"
      >
        <i :class="['aside-menu__icon', item.icon]" />
        <span class="aside-menu__label">{{ item.label }}</span>
      </div>
    </nav>
    <div class="aside-menu__settings" @click="$router.replace({ name: 'settings' })">
      <un-i-ep-setting class="aside-menu__settings-icon" />
      <span class="aside-menu__settings-label">设置</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAsideStore } from '@/store/hooks/aside';
import { storeToRefs } from 'pinia';

const { isCollapsed } = storeToRefs(useAsideStore());

const menuItems = [
  { label: '总览', icon: 'i-ep-reading', name: 'overview' },
  { label: '图片', icon: 'i-ep-picture', name: 'picture' },
  { label: '视频', icon: 'i-ep-video-camera', name: 'video' },
  { label: '任务中心', icon: 'i-ep-cpu', name: 'download' }
];
</script>

<style lang="scss" scoped>
.aside-menu {
  width: 200px;
  background-color: var(--light-nav-bg-color);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;

  &--collapsed {
    width: 80px;

    .aside-menu__label {
      opacity: 0;
    }
  }
}

.aside-menu__nav {
  flex-grow: 1;
}

.aside-menu__item {
  display: flex;
  align-items: center;
  margin: 0 20px 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;
  white-space: nowrap;

  &--active,
  &:hover {
    color: #007bff;
    background-color: #f8f9fa;
  }
}

.aside-menu__icon {
  flex-shrink: 0;
}

.aside-menu__label {
  margin-left: 2px;
  transition: opacity 0.3s;
}

.aside-menu__settings {
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 0 4px #0000001a;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    color: #007bff;
    background-color: #f1f1f1;
  }
}

.aside-menu__settings-icon {
  flex-shrink: 0;
}

.aside-menu__settings-label {
  margin-left: 2px;
}

@media (prefers-color-scheme: dark) {
  .aside-menu {
    background-color: rgba(50, 50, 50, 0.8);
    color: #f0f0f0;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .aside-menu__item {
    &--active,
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #007bff;
    }
  }

  .aside-menu__settings {
    border-top-color: rgba(255, 255, 255, 0.15);

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
