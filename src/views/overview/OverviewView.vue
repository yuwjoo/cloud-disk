<!--
 * @FileName: 页面-总览
 * @FilePath: \cloud-disk\src\views\overview\OverviewView.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-07-12 15:18:36
 * @Description: 
-->
<template>
  <div class="overview__header">
    <el-breadcrumb class="overview__header-breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">全部文件</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">utils</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">测试</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="overview__header-operate">
      <el-dropdown @command="handleUploadCommand">
        <el-button class="overview__dropdown-button" type="primary" @click="handleClickUpload">
          <el-icon class="el-icon--left"><i-ep-upload /></el-icon>
          <span>上传</span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="uploadFile">上传文件</el-dropdown-item>
            <el-dropdown-item command="uploadFolder">上传文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="primary" @click="handleClickCreateFolder">
        <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
        <span>新建文件夹</span>
      </el-button>
    </div>
  </div>

  <el-empty class="overview__empty" description="暂无数据" />

  <OverviewUploadFile ref="overviewUploadFileRef" />
</template>

<script setup lang="ts">
import OverviewUploadFile from './components/OverviewUploadFile.vue';

const overviewUploadFileRef = ref<InstanceType<typeof OverviewUploadFile> | null>(null); // 上传文件组件ref

/**
 * @description: 处理点击上传按钮
 */
function handleClickUpload() {
  overviewUploadFileRef.value?.open(false);
}

/**
 * @description: 处理点击上传下拉选项
 * @param {string} command 指令字符
 */
function handleUploadCommand(command: string) {
  overviewUploadFileRef.value?.open(command === 'uploadFolder');
}

/**
 * @description: 处理点击新建文件夹
 */
function handleClickCreateFolder() {
  console.log('新建文件夹');
}
</script>

<style lang="scss" scoped>
.overview__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-medium);

  .overview__header-breadcrumb {
    font-weight: bold;
  }

  .overview__header-operate {
    display: flex;
    gap: 0 var(--spacing-small);

    .overview__dropdown-button {
      outline-style: none;
    }
  }
}

.overview__empty {
  position: relative;
  top: 20%;
}
</style>
