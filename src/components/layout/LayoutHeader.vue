<template>
  <header class="header">
    <div class="header__content header__content--left">
      <div v-if="$route.meta.haveAside" class="header__collapse" @click="toggleAside()">
        <un-i-ep-expand v-if="isCollapsed" />
        <un-i-ep-fold v-else />
      </div>

      <div class="header__logo">
        <un-i-custom-logo class="header__logo-icon" />
        <span class="header__logo-text">cloud-disk</span>
      </div>
    </div>
    <div class="header__content header__content--right">
      <div class="header__theme-toggle" title="切换主题" @click="toggleDark($event)">
        <un-i-ep-moon v-if="isDark" class="header__theme-icon header__theme-icon--moon" />
        <un-i-ep-sunny v-else class="header__theme-icon header__theme-icon--sunny" />
      </div>
      <div class="header__user-icon">
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
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 var(--large-spacing);
  height: 64px;
  background-color: var(--light-header-bg-color);
  color: var(--dark-text-color);

  &__content {
    display: flex;
    align-items: center;

    &--left {
      .header__collapse {
        font-size: 22px;
        margin-right: var(--xlarge-spacing);
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
          margin-left: var(--small-spacing);
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

      .header__user-icon {
        font-size: 16px;
        cursor: pointer;
        border-radius: 50%;
        background-color: var(--white-color);
        padding: 4px;
        color: var(--light-text-color);
        margin-left: var(--xlarge-spacing);
      }
    }
  }

  :root.dark & {
    background-color: var(--dark-header-bg-color);

    &__content--left .header__logo {
      color: var(--primary-color);
    }
  }
}
</style>
