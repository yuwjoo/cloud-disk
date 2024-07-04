<template>
  <header class="header">
    <div class="header_content-left">
      <div v-if="$route.meta.haveAside" class="header_content-left_collapse" @click="toggleAside()">
        <un-i-ep-fold v-if="isCollapsed" />
        <un-i-ep-expand v-else />
      </div>

      <div class="header_content-left_logo">
        <un-i-custom-logo class="header_content-left_logo_icon" />
        <span class="header_content-left_logo_text">cloud-disk</span>
      </div>
    </div>
    <div class="header_content-right">
      <div class="header_content-right_theme" title="切换主题" @click="toggleDark($event)">
        <un-i-ep-moon v-if="isDark" class="header_content-right_theme_moon" />
        <un-i-ep-sunny v-else class="header_content-right_theme_sunny" />
      </div>
      <div class="header_content-right_theme_user">
        <un-i-ep-user />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAsideStore } from '@/store/hooks/aside';
import { useThemeStore } from '@/store/hooks/theme';

const { isCollapsed } = storeToRefs(useAsideStore());
const { isDark } = storeToRefs(useThemeStore());

const { toggleAside } = useAsideStore();
const { toggleDark } = useThemeStore();
</script>

<style lang="scss" scoped>
:root.dark {
  .header {
    background-color: var(--dark-header-bg-color);

    .header_content-left {
      .header_content-left_logo {
        color: var(--primary-color);
      }
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  height: 64px;
  background-color: var(--light-header-bg-color);
  color: var(--light-text-color);

  .header_content-left,
  .header_content-right {
    display: flex;
    align-items: center;
  }

  .header_content-left {
    .header_content-left_collapse {
      font-size: 22px;
      margin-right: 32px;
      cursor: pointer;
    }

    .header_content-left_logo {
      display: flex;
      align-items: center;

      .header_content-left_logo_icon {
        font-size: 24px;
      }

      .header_content-left_logo_text {
        font-size: 18px;
        margin-left: 8px;
        font-weight: bold;
      }
    }
  }

  .header_content-right {
    .header_content-right_theme {
      cursor: pointer;

      .header_content-right_theme_moon {
        font-size: 20px;
      }

      .header_content-right_theme_sunny {
        font-size: 22px;
      }
    }

    .header_content-right_theme_user {
      font-size: 16px;
      cursor: pointer;
      border-radius: 50%;
      background-color: var(--white-color);
      padding: 4px;
      color: var(--dark-text-color);
      margin-left: 32px;
    }
  }
}
</style>
