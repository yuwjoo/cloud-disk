<!--
 * @FileName: 布局-头部
 * @FilePath: \cloud-disk\src\layouts\control\components\LayoutHeader.vue
 * @Author: YH
 * @Date: 2024-07-06 13:52:53
 * @LastEditors: YH
 * @LastEditTime: 2024-07-15 14:24:40
 * @Description: 
-->
<template>
  <header class="header">
    <div class="header__content header__content--left">
      <component
        :is="isCollapsed ? IEpExpand : IEpFold"
        class="header__collapse"
        @click="toggleAside()"
      />

      <div class="header__logo">
        <i-icons-logo class="header__logo-icon" />
        <span class="header__logo-text">cloud-disk</span>
      </div>
    </div>
    <div class="header__content header__content--right">
      <el-badge
        class="header__task-badge"
        :value="taskCount"
        :max="99"
        :show-zero="false"
        @click="taskDrawerOpen()"
      >
        <i-ep-sort class="header__task-icon" />
      </el-badge>
      <div class="header__theme-toggle" title="切换主题" @click="toggleDark($event)">
        <i-ep-moon v-if="isDark" class="header__theme-icon header__theme-icon--moon" />
        <i-ep-sunny v-else class="header__theme-icon header__theme-icon--sunny" />
      </div>
      <el-dropdown>
        <el-avatar class="header__avatar" :size="26" src="https://empty">
          <i-ep-user-filled />
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import IEpExpand from '~icons/ep/expand';
import IEpFold from '~icons/ep/fold';
import { storeToRefs } from 'pinia';
import { useAsideStore } from '@/store/aside';
import { useThemeStore } from '@/store/theme';
import { useTaskDrawerStore } from '@/store/taskDrawer';

const { isCollapsed } = storeToRefs(useAsideStore());
const { taskCount } = storeToRefs(useTaskDrawerStore());
const { open: taskDrawerOpen } = useTaskDrawerStore();
const { isDark } = storeToRefs(useThemeStore());

const { toggleAside } = useAsideStore();
const { toggleDark } = useThemeStore();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 var(--spacing-large);
  height: 64px;
  background-color: var(--bg-color-header);
  color: var(--color-white);

  .header__content {
    display: flex;
    align-items: center;
    gap: 0 var(--spacing-extra-large);

    &--left {
      .header__collapse {
        font-size: 22px;
        cursor: pointer;
      }

      .header__logo {
        display: flex;
        align-items: center;

        &-icon {
          font-size: 24px;
        }

        &-text {
          font-size: 18px;
          margin-left: var(--spacing-small);
          font-weight: bold;
        }
      }
    }

    &--right {
      .header__task-badge {
        cursor: pointer;
        user-select: none;

        .header__task-icon {
          font-size: 18px;
        }
      }

      .header__theme-toggle {
        cursor: pointer;

        .header__theme-icon {
          &--moon {
            font-size: 20px;
          }

          &--sunny {
            font-size: 22px;
          }
        }
      }

      .header__avatar {
        cursor: pointer;
        outline-style: none;
        font-size: 18px;
      }
    }
  }
}
</style>
