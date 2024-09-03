<!--
 * @FileName: 页面-总览
 * @FilePath: \cloud-disk\src\views\overview\OverviewView.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-09-03 17:45:10
 * @Description: 
-->
<template>
  <div class="overview" v-loading="loading">
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
        <el-button
          type="danger"
          :disabled="checkedList.length === 0"
          :loading="deleteLoading"
          @click="deleteFile"
        >
          <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </div>

    <el-checkbox
      class="overview-all-check"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>

    <el-checkbox-group
      class="overview-checkbox-group"
      v-model="checkedList"
      @change="handleCheckedChange"
    >
      <div class="overview-list" :class="{ 'overview-list--empty': filterFileList.length === 0 }">
        <div
          class="overview-list__item"
          v-for="(item, index) in filterFileList"
          :key="index"
          @click="item.type === 'folder' ? getFileList(item.fullPath) : null"
        >
          <el-checkbox
            class="overview-list__item-checkbox"
            :class="{ 'is-show': checkedList.indexOf(item.fullPath) !== -1 }"
            :value="item.fullPath"
            @click.stop
          ></el-checkbox>
          <el-dropdown
            class="overview-list__dropdown"
            :teleported="false"
            @command="(ev) => handleFileCommand(ev, item)"
          >
            <i-ep-more-filled class="overview-list__more" />
            <template #dropdown>
              <el-dropdown-menu @click.stop>
                <el-dropdown-item v-if="item.type === 'file'" command="download"
                  >下载</el-dropdown-item
                >
                <el-dropdown-item command="rename">重命名</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img class="overview-list__cover" :src="getCover(item.cover)" alt="" @dragstart.prevent />
          <div class="overview-list__name" :title="item.name">{{ item.name }}</div>
          <div class="overview-list__modified-date">{{ item.modifiedDate }}</div>
        </div>
        <el-empty class="overview-list__empty" description="暂无数据" />
      </div>
    </el-checkbox-group>

    <input class="overview-select-file" ref="uploadRef" type="file" multiple @change="uploadFile" />
  </div>
</template>

<script setup lang="ts">
import folder from '@/assets/images/fileSystem/small/folder.png';
import compressedFile from '@/assets/images/fileSystem/small/compressedFile.png';
import docmentFile from '@/assets/images/fileSystem/small/docmentFile.png';
import executionFile from '@/assets/images/fileSystem/small/executionFile.png';
import pdfFile from '@/assets/images/fileSystem/small/pdfFile.png';
import { useFileManage } from './hooks/fileManage';
import { useUpload } from './hooks/upload';
import type { CheckboxValueType } from 'element-plus';
import type { FileList } from './types/fileManage';
import { useFileSystem } from '@/store/fileSystem';
import { storeToRefs } from 'pinia';

const {
  loading,
  currentFolderPath,
  pathList,
  fileList,
  checkAll,
  isIndeterminate,
  checkedList,
  deleteLoading,
  getFileList,
  createFolder,
  downloadFile,
  deleteFile,
  renameFile
} = useFileManage();
const { uploadRef, selectFile, uploadFile, handleCommand } = useUpload(
  currentFolderPath,
  getFileList
);
const { searchValue } = storeToRefs(useFileSystem());
const filterFileList = computed(() => {
  return fileList.value.filter((item) =>
    item.name.includes(searchValue.value)
  ) as unknown as FileList;
});

/**
 * @description: 处理全选
 * @param {CheckboxValueType} val 选中状态
 */
function handleCheckAllChange(val: CheckboxValueType) {
  checkedList.value = val ? fileList.value.map((item) => item.fullPath) : [];
  isIndeterminate.value = false;
}

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
function handleCheckedChange(value: CheckboxValueType[]) {
  const checkedCount = value.length;
  checkAll.value = checkedCount === fileList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < fileList.value.length;
}

/**
 * @description: 处理文件下拉按钮选中
 * @param {string} command 指令
 */
function handleFileCommand(command: string, item: FileList[0]) {
  switch (command) {
    case 'download':
      downloadFile(item.fullPath);
      break;
    case 'rename':
      renameFile(item);
      break;
  }
}

/**
 * @description: 获取封面
 * @param {string} cover 封面地址
 * @return {string} 封面
 */
function getCover(cover: string): string {
  switch (cover) {
    case 'localhost://folder.png':
      return folder;
    case 'localhost://compressedFile.png':
      return compressedFile;
    case 'localhost://executionFile.png':
      return executionFile;
    case 'localhost://pdfFile.png':
      return pdfFile;
    case 'localhost://docmentFile.png':
      return docmentFile;
    default:
      return cover;
  }
}
</script>

<style lang="scss" scoped>
.overview {
  height: 100%;
  display: flex;
  flex-direction: column;

  .overview-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);
    flex-shrink: 0;

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

      .el-button {
        margin-left: 0;
      }
    }
  }

  .overview-all-check {
    margin-bottom: var(--spacing-medium);
  }

  .overview-checkbox-group {
    height: 0;
    flex-grow: 1;

    .overview-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-small);
      height: 100%;
      overflow-y: auto;
      align-content: flex-start;

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

          .overview-list__item-checkbox,
          .overview-list__dropdown {
            display: block;
          }
        }

        .overview-list__item-checkbox {
          position: absolute;
          top: var(--spacing-small);
          left: var(--spacing-small);
          display: none;

          &.is-show {
            display: block;
          }
        }

        .overview-list__dropdown {
          position: absolute;
          top: var(--spacing-small);
          right: var(--spacing-small);
          display: none;

          .overview-list__more {
            outline-style: none;
          }
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
  }

  .overview-select-file {
    display: none;
  }
}
</style>
