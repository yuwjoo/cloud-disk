<!--
 * @FileName: 页面-侧边栏
 * @FilePath: \cloud-disk\src\components\layout\LayoutAside.vue
 * @Author: YH
 * @Date: 2024-07-06 13:52:53
 * @LastEditors: YH
 * @LastEditTime: 2024-07-12 15:29:32
 * @Description: 
-->
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
        <component :is="item.icon" class="aside-menu__icon" />
        <span class="aside-menu__label">{{ item.label }}</span>
      </div>
    </nav>
    <div class="aside-menu__setting" @click="$router.replace({ name: 'settings' })">
      <i-ep-setting class="aside-menu__setting-icon" />
      <span class="aside-menu__setting-label">设置</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import IEpReading from '~icons/ep/reading';
import IEpPicture from '~icons/ep/picture';
import IEpVideoCamera from '~icons/ep/video-camera';
import IEpCpu from '~icons/ep/cpu';
import { useAsideStore } from '@/store/hooks/aside';
import { storeToRefs } from 'pinia';

const { isCollapsed } = storeToRefs(useAsideStore());

const menuItems = [
  { label: '总览', icon: IEpReading, name: 'overview' },
  { label: '图片', icon: IEpPicture, name: 'picture' },
  { label: '视频', icon: IEpVideoCamera, name: 'video' },
  { label: '任务中心', icon: IEpCpu, name: 'download' }
];
</script>

<style lang="scss" scoped>
.aside-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  background-color: var(--bg-color-nav);
  transition: width 0.3s ease;

  &--collapsed {
    width: 90px;

    .aside-menu__label,
    .aside-menu__setting-label {
      opacity: 0;
    }
  }

  .aside-menu__nav {
    padding-top: var(--spacing-medium);

    .aside-menu__item {
      display: flex;
      align-items: center;
      margin: 0 var(--spacing-medium) var(--spacing-medium);
      padding: var(--spacing-medium) 20px;
      cursor: pointer;
      border-radius: var(--border-radius-base);
      transition:
        background-color 0.3s,
        color 0.3s;
      white-space: nowrap;

      &--active,
      &:hover {
        color: var(--color-primary);
        background-color: rgba(var(--color-primary-rgb), 0.1);
      }

      .aside-menu__icon {
        flex-shrink: 0;
        font-size: 18px;
      }

      .aside-menu__label {
        margin-left: var(--spacing-small);
        transition: opacity 0.3s;
      }
    }
  }

  .aside-menu__setting {
    display: flex;
    align-items: center;
    padding: var(--spacing-medium) 36px;
    border-top: var(--border-width) var(--border-style) var(--border-color);
    cursor: pointer;
    transition: color 0.3s;
    white-space: nowrap;

    &:hover {
      color: var(--color-primary);
    }

    .aside-menu__setting-icon {
      flex-shrink: 0;
      font-size: 18px;
    }

    .aside-menu__setting-label {
      margin-left: var(--spacing-small);
    }
  }
}
</style>
