<template>
  <header class="header">
    <div class="header__content header__content--left">
      <component
        v-if="$route.meta.haveAside"
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
import { useAsideStore } from '@/store/hooks/aside';
import { useThemeStore } from '@/store/hooks/theme';

const { isCollapsed } = storeToRefs(useAsideStore());
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

    &--left {
      .header__collapse {
        font-size: 22px;
        margin-right: var(--spacing-extra-large);
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
        margin-left: var(--spacing-large);
      }
    }
  }
}
</style>
