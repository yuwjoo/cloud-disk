<template>
  <aside :class="['aside-menu', { 'aside-menu--collapsed': isCollapsed }]">
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
      <un-i-ep-setting class="aside-menu__icon" />
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
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: var(--light-nav-bg-color);
  transition: width 0.3s ease;

  &--collapsed {
    width: 80px;

    .aside-menu__label {
      opacity: 0;
    }
  }
}

.aside-menu__nav {
  flex-grow: 1;
  padding-top: var(--medium-spacing);
}

.aside-menu__item {
  display: flex;
  align-items: center;
  margin: 0 var(--medium-spacing) var(--medium-spacing);
  padding: var(--medium-spacing);
  cursor: pointer;
  border-radius: var(--default-radii);
  transition:
    background-color 0.3s,
    color 0.3s;
  white-space: nowrap;

  &--active,
  &:hover {
    color: var(--primary-color);
    background-color: var(--primary-color-light-9);
  }
}

.aside-menu__icon {
  flex-shrink: 0;
  font-size: 14px;
}

.aside-menu__label {
  margin-left: var(--small-spacing);
  transition: opacity 0.3s;
}

.aside-menu__settings {
  display: flex;
  align-items: center;
  padding: var(--small-spacing);
  border-top: 1px solid var(--light-border);
  // box-shadow: 0 0 4px #0000001a;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    color: var(--primary-color);
    background-color: var(--primary-color-light-9);
  }
}

.aside-menu__settings-label {
  margin-left: var(--small-spacing);
}

:root.dark {
  .aside-menu {
    background-color: var(--dark-nav-bg-color);
    color: var(--dark-text-color);
  }

  .aside-menu__item {
    &--active,
    &:hover {
      background-color: color-set-alpha('primary', 0.05);
      color: var(--primary-color);
    }
  }

  .aside-menu__settings {
    // border-top-color: rgba(255, 255, 255, 0.15);

    &:hover {
      // background-color: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
