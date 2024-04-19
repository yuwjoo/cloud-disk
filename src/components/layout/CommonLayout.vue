<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-button type="primary" @click="themeStore.toggleDark()"
        >切换{{ themeStore.isDark }}</el-button
      >
      <input type="text" />
    </el-header>
    <el-container>
      <common-layout-aside v-if="route.meta.haveAside" />
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/store/hooks/theme';

const CommonLayoutAside = defineAsyncComponent(() => import('./CommonLayoutAside.vue'));

const route = useRoute();
const themeStore = useThemeStore();
</script>
