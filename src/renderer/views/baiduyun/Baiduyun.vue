<!--
 * @FileName: 百度云盘
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\Baiduyun.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-19 14:27:23
 * @Description: 
-->
<template>
  <div v-if="true" class="baiduyun" v-loading="loading">
    <div class="baiduyun-header">
      <dir-breadcrumb class="baiduyun-header__left" :path="search.dir" />

      <div class="baiduyun-header__right">
        <upload-button @select="handleUploadFile" />

        <el-button
          class="baiduyun-header__right-create-btn"
          type="primary"
          @click="handleCreateFolder"
        >
          <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
          <span>新建文件夹</span>
        </el-button>

        <el-button v-if="checkedList.length" type="danger" @click="handleBatchDelete">
          <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
          <span>批量删除</span>
        </el-button>
      </div>
    </div>

    <FileList
      v-model:checked-list="checkedList"
      :list="list"
      :parse-item="handleParseItem"
      @click-item="handleClickItem"
      @operate-item="handleOperateItem"
    />
  </div>

  <BaiduyunLogin v-else />
</template>

<script setup lang="ts" name="BaiduyunView">
import { useRoute, useRouter } from 'vue-router';
import BaiduyunLogin from './components/Login.vue';
import type { FileItem } from '@/components/fileList/hooks/fileData';
import type { FileItemCommand } from '@/components/fileList/FileList.vue';
import { useList } from './hooks/list';
import { useFileOperate } from './hooks/fileOperate';
import type { ApiGetListResponse } from '@/types/api/baiduyun';

const route = useRoute();
const router = useRouter();

const { search, list, checkedList, loading, refreshList } = useList();

const {
  handleUploadFile,
  handleCreateFolder,
  handleBatchDelete,
  handleDownload,
  handleRename,
  handleDelete
} = useFileOperate(search, checkedList, refreshList);

/**
 * @description: 处理解析文件数据项
 */
const handleParseItem = (item: ApiGetListResponse['list'][0]): FileItem<any> => {
  return {
    name: item.server_filename,
    size: item.size,
    type: item.isdir ? 'dir' : 'file',
    cover: '',
    updatedTime: item.local_mtime * 1000,
    operate: {
      download: !item.isdir,
      rename: true,
      delete: true
    }
  };
};

/**
 * @description: 处理点击文件
 */
const handleClickItem = (item: ApiGetListResponse['list'][0]) => {
  if (item.isdir) {
    // 进入文件夹
    router.push({
      name: route.name,
      query: {
        path: item.path
      }
    });
  } else {
    // 浏览文件
  }
};

/**
 * @description: 处理操作文件
 */
const handleOperateItem = (command: FileItemCommand, item: ApiGetListResponse['list'][0]) => {
  switch (command) {
    case 'download':
      handleDownload(item);
      break;
    case 'rename':
      handleRename(item);
      break;
    case 'delete':
      handleDelete(item);
      break;
  }
};
</script>

<style lang="scss" scoped>
.baiduyun {
  height: 100%;
  display: flex;
  flex-direction: column;

  .baiduyun-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);

    .baiduyun-header__right-create-btn {
      margin-left: 12px;
    }
  }
}
</style>
