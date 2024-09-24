<!--
 * @FileName: 布局-头部
 * @FilePath: \cloud-disk\src\layouts\control\components\LayoutHeader.vue
 * @Author: YH
 * @Date: 2024-07-06 13:52:53
 * @LastEditors: YH
 * @LastEditTime: 2024-09-03 16:43:01
 * @Description: 
-->
<template>
  <header class="header">
    <div class="header__content header__content--left">
      <component
        :is="layoutStore.isCollapsed ? IEpExpand : IEpFold"
        class="header__collapse"
        @click="layoutStore.toggleAside()"
      />

      <div class="header__logo">
        <i-icons-logo class="header__logo-icon" />
        <span class="header__logo-text">cloud-disk</span>
      </div>

      <el-input
        v-if="userStore.isLogin"
        class="header__search"
        v-model="layoutStore.searchValue"
        :prefix-icon="IESearch"
        placeholder="模糊搜索"
        clearable
      />
    </div>

    <div class="header__content header__content--right">
      <el-badge
        v-if="userStore.isLogin"
        class="header__task-badge"
        :value="uploadTaskCount"
        :max="99"
        :show-zero="false"
        @click="visible = true"
      >
        <i-ep-sort class="header__task-icon" />
      </el-badge>
      <div class="header__theme-toggle" title="切换主题" @click="themeStore.toggleDark($event)">
        <i-ep-moon v-if="themeStore.isDark" class="header__theme-icon header__theme-icon--moon" />
        <i-ep-sunny v-else class="header__theme-icon header__theme-icon--sunny" />
      </div>
      <el-dropdown>
        <el-avatar class="header__avatar" :size="26" src="">
          <i-ep-user-filled />
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="userStore.isLogin">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </template>
            <template v-else>
              <el-dropdown-item>前往登录</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import IESearch from '~icons/ep/search';
import IEpExpand from '~icons/ep/expand';
import IEpFold from '~icons/ep/fold';
import { useThemeStore } from '@/store/theme';
import { uploadTaskCount, visible } from '@/utils/uploadManager';
import { useLayoutStore } from '@/store/layout';
import { useUserStore } from '@/store/user';

const layoutStore = useLayoutStore(); // 布局仓库
const themeStore = useThemeStore(); // 主题仓库
const userStore = useUserStore(); // 用户仓库
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
        flex-shrink: 0;
      }

      .header__logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;

        &-icon {
          font-size: 24px;
        }

        &-text {
          font-size: 18px;
          margin-left: var(--spacing-small);
          font-weight: bold;
        }
      }

      .header__search {
        width: 300px;
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
