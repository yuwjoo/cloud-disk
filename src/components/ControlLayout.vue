<template>
  <el-container class="h-vh">
    <el-header
      class="flex justify-between bg-[var(--el-color-primary-dark-2)] dark:bg-[transparent] border-b-solid border-b border-b-[var(--el-border-color)]"
    >
      <div class="flex items-center">
        <el-icon class="cursor-pointer" size="26px" @click="isCollapse = !isCollapse">
          <i :class="isCollapse ? 'i-ep:expand' : 'i-ep:fold'"></i>
        </el-icon>
        <h3 class="mx-[20px]">DloudDisk</h3>
        <el-input />
      </div>
      <div class="flex items-center">
        <el-switch
          class="mr-[20px]"
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
        />
        <el-dropdown>
          <el-avatar class="cursor-pointer outline-none" size="small" :icon="UserFilled" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside class="control_aside">
        <el-menu class="control_aside_menu" default-active="2" :collapse="isCollapse">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><i-ep-location /></el-icon>
              <span>我的文件</span>
            </template>
            <el-menu-item-group title="视频">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><i-ep-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><i-ep-document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><i-ep-setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <slot></slot>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Moon, Sunny, UserFilled } from '@element-plus/icons-vue';
import { useDark } from '@vueuse/core';

const isCollapse = ref<boolean>(false); // 是否折叠侧边栏
const isDark = useDark(); // 是否深色模式
</script>
