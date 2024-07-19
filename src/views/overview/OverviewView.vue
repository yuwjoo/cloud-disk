<!--
 * @FileName: 页面-总览
 * @FilePath: \cloud-disk\src\views\overview\OverviewView.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-07-18 14:22:29
 * @Description: 
-->
<template>
  <div v-loading="loading" style="height: 100%">
    <div class="overview-top">
      <div class="overview-top__nav">
        <template v-if="pathList.length > 1">
          <el-icon
            class="overview-top__back"
            @click="getFileList(pathList[pathList.length - 2]?.path)"
          >
            <i-ep-back />
          </el-icon>
          <el-divider direction="vertical" />
        </template>
        <el-breadcrumb class="overview-top__breadcrumb" separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in pathList"
            :key="index"
            @click="currentFolderPath !== item.path ? getFileList(item.path) : null"
          >
            {{ item.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="overview-top__tools">
        <el-dropdown @command="handleCommand">
          <el-button class="overview-top__dropdown-btn" type="primary" @click="selectFile">
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
        <el-button type="primary" @click="createFolder">
          <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
          <span>新建文件夹</span>
        </el-button>
      </div>
    </div>

    <div class="overview-list" :class="{ 'overview-list--empty': fileList.length === 0 }">
      <div
        class="overview-list__item"
        v-for="(item, index) in fileList"
        :key="index"
        @click="item.type === 'folder' ? getFileList(item.fullPath) : null"
      >
        <el-icon
          v-if="item.type === 'file'"
          class="overview-list__download"
          @click="downloadFile(item.fullPath)"
        >
          <i-ep-download />
        </el-icon>
        <img class="overview-list__cover" :src="item.cover" alt="" @dragstart.prevent />
        <div class="overview-list__name" :title="item.name">{{ item.name }}</div>
        <div class="overview-list__modified-date">{{ item.modifiedDate }}</div>
      </div>
      <el-empty class="overview-list__empty" description="暂无数据" />
    </div>

    <input class="overview-select-file" ref="uploadRef" type="file" multiple @change="uploadFile" />
  </div>
</template>

<script setup lang="ts">
import { useFileManage } from './hooks/fileManage';
import { useUpload } from './hooks/upload';

const { loading, currentFolderPath, pathList, fileList, getFileList, createFolder, downloadFile } =
  useFileManage();
const { uploadRef, selectFile, uploadFile, handleCommand } = useUpload(
  currentFolderPath,
  getFileList
);
</script>

<style lang="scss" scoped>
.overview-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-medium);

  .overview-top__nav {
    display: flex;
    align-items: center;

    .overview-top__back {
      font-size: 18px;
      cursor: pointer;
      margin-right: var(--spacing-small);

      &:hover {
        color: var(--color-primary);
      }
    }

    .overview-top__breadcrumb {
      font-weight: bold;

      :deep(.el-breadcrumb__item):not(:last-child) {
        cursor: pointer;

        .el-breadcrumb__inner:hover {
          color: var(--color-primary);
        }
      }
    }
  }

  .overview-top__tools {
    display: flex;
    gap: 0 var(--spacing-small);

    .overview-top__dropdown-btn {
      outline-style: none;
    }
  }
}

.overview-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-small);

  &.overview-list--empty {
    position: relative;
    top: 20%;
    justify-content: center;

    .overview-list__empty {
      display: block;
    }
  }

  .overview-list__item {
    position: relative;
    cursor: pointer;
    text-align: center;
    line-height: var(--text-line-height-base);
    padding: var(--spacing-medium);
    border-radius: var(--border-radius-base);
    width: 140px;
    box-sizing: border-box;

    &:hover {
      background-color: var(--fill-color);

      .overview-list__download {
        display: block;
      }
    }

    .overview-list__download {
      position: absolute;
      top: 0;
      right: 0;
      padding: var(--spacing-small);
      color: var(--color-primary);
      display: none;
      font-size: 18px;
    }

    .overview-list__cover {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }

    .overview-list__name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: var(--text-size-small);
      word-wrap: break-word;

      &:hover {
        color: var(--color-primary);
      }
    }

    .overview-list__modified-date {
      margin-top: 2px;
      color: var(--text-color-secondary);
      font-size: var(--text-size-extra-small);
    }
  }

  .overview-list__empty {
    display: none;
  }
}

.overview-select-file {
  display: none;
}
</style>
