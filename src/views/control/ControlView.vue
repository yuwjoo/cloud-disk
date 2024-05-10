<template>
  <el-container>
    <el-aside class="control_aside">
      <el-menu class="control_aside_menu" default-active="2" :collapse="asideStore.isCollapse">
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
      <div style="height: 5000px"></div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useAsideStore } from '@/store/hooks/aside';

const asideStore = useAsideStore();
</script>

<style lang="scss" scoped>
.control_aside {
  position: fixed;
  left: 0;
  top: var(--el-header-height);
  border-right: 1px solid var(--el-border-color);
  width: fit-content;
  height: calc(100vh - var(--el-header-height));
}
.control_aside_menu {
  border-right: none;
}
</style>
