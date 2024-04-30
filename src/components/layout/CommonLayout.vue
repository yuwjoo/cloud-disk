<template>
  <el-container class="common-layout-container">
    <el-header class="common-layout-container_header">
      <el-row class="common-layout-container_header_row" justify="space-between" align="middle">
        <el-col :span="12">
          <el-space :size="30">
            <el-icon
              class="common-layout_collapse-icon"
              size="26px"
              v-if="route.meta.haveAside"
              @click="isCollapse = !isCollapse"
            >
              <i-ep-expand v-if="isCollapse" />
              <i-ep-fold v-else />
            </el-icon>
            <h3 class="common-layout_title">DloudDisk</h3>
            <el-input v-if="route.meta.haveAside" />
          </el-space>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="themeStore.toggleDark()"
            >切换{{ themeStore.isDark }}</el-button
          >
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <common-layout-aside v-model:is-collapse="isCollapse" v-if="route.meta.haveAside" />
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/store/hooks/theme';

const CommonLayoutAside = defineAsyncComponent(() => import('./CommonLayoutAside.vue'));

const route = useRoute();
const themeStore = useThemeStore();
const isCollapse = ref<boolean>(false); // 是否折叠菜单
</script>

<style scoped>
.common-layout-container {
  height: 100vh;
}
.common-layout-container_header {
  border-bottom: 1px solid var(--el-border-color);
}
.common-layout-container_header_row {
  height: 100%;
}
.common-layout_collapse-icon {
  color: var(--el-text-color-primary);
  cursor: pointer;
}
.common-layout_title {
  color: var(--el-text-color-primary);
}
</style>
