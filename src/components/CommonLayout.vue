<template>
  <el-container class="h-vh">
    <el-header class="bg-primary">
      <div class="flex justify-between">
        <div class="flex items-center">
          <h3 class="text-primary mx-[20px]">DloudDisk</h3>
        </div>
        <div class="flex items-center">
          <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" />
          <el-dropdown>
            <el-avatar size="small" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-scrollbar>
        <slot></slot>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useDark } from '@vueuse/core';

const isDark = useDark(); // 是否深色模式
</script>
