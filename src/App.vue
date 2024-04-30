<template>
  <el-scrollbar height="100vh">
    <el-header class="app_header" always>
      <el-row class="app_header_row" justify="space-between" align="middle">
        <el-col :span="12">
          <el-space :size="30">
            <el-icon
              class="app_header_row_collapse-icon"
              size="26px"
              v-if="route.name === 'control'"
              @click="asideStore.isCollapse = !asideStore.isCollapse"
            >
              <i-ep-expand v-if="asideStore.isCollapse" />
              <i-ep-fold v-else />
            </el-icon>
            <h3 class="app_header_row_title">DloudDisk</h3>
            <el-input v-if="route.name === 'control'" />
          </el-space>
        </el-col>
        <el-col class="app_header_row--right" :span="6">
          <el-space :size="30">
            <el-switch
              class="app_header_row_theme-switch"
              v-model="themeStore.isDark"
              :active-action-icon="Moon"
              :inactive-action-icon="Sunny"
            />
            <el-dropdown>
              <el-avatar size="small" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </el-col>
      </el-row>
    </el-header>

    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/store/hooks/theme';
import { useAsideStore } from '@/store/hooks/aside';

const route = useRoute();
const themeStore = useThemeStore();
const asideStore = useAsideStore();
</script>

<style>
.app_header {
  position: sticky;
  top: 0;
  width: 100%;
  height: var(--vue-header-height);
  z-index: 1;
  border-bottom: 1px solid var(--el-border-color);
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
.app_header_row {
  height: 100%;
}
.app_header_row--right {
  display: flex;
  justify-content: flex-end;
}
.app_header_row_collapse-icon {
  color: var(--el-text-color-primary);
  cursor: pointer;
}
.app_header_row_title {
  color: var(--el-text-color-primary);
}
.app_header_row_theme-switch {
  --el-switch-on-color: var(--el-border-color);
}
</style>
