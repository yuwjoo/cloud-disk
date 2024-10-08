<!--
 * @FileName: 页面-存储
 * @FilePath: \cloud-disk\src\views\storage\StorageView.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-10-08 17:27:11
 * @Description: 
-->
<template>
  <div class="storage" v-loading="loading">
    <div class="storage__header">
      <BreadcrumbComp v-model:parent="search.parent" />

      <div class="storage__header-right">
        <UploadButtonComp v-model:search="search" @change="refreshList()" />

        <el-button class="create-file-btn" type="primary" @click="handleCreateFolder">
          <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
          <span>新建文件夹</span>
        </el-button>

        <el-button type="danger" :disabled="!checkedList.length" @click="handleBatchDelete">
          <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
          <span>批量删除</span>
        </el-button>
      </div>
    </div>
    <AllCheckFileListComp v-model="checkedList" :list="list">
      <template v-slot="{ item }">
        <FileItemComp :item="item" @open="handleOpen" @change="refreshList()" />
      </template>
    </AllCheckFileListComp>
  </div>
</template>

<script setup lang="ts">
import { batchDeleteFile, createFile } from '@/api/storage';
import { useFetchList, useSearch } from './hooks/storage-view';
import BreadcrumbComp from './components/BreadcrumbComp.vue';
import UploadButtonComp from './components/UploadButtonComp.vue';
import AllCheckFileListComp from './components/AllCheckFileListComp.vue';
import FileItemComp from './components/FileItemComp.vue';
import type { FileInfo } from '@/api/types/storage';
import { useRouter } from '@/library/vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const { search } = useSearch(); // 筛选数据
const { list, loading, refreshList } = useFetchList(search); // 列表数据
const checkedList = ref<string[]>([]); // 选中列表

/**
 * @description: 处理创建文件夹
 */
function handleCreateFolder() {
  ElMessageBox.prompt('请输入文件夹名称', '创建文件夹', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[^"*<>?\\|/:]+$/,
    inputErrorMessage: '名称不合法',
    beforeClose: async (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      try {
        await createFile({
          parent: search.parent,
          name: ctx.inputValue,
          isDirectory: true
        });
        ElMessage({
          type: 'success',
          message: '创建成功'
        });
        close();
        refreshList();
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
}

/**
 * @description: 处理批量删除
 */
function handleBatchDelete() {
  ElMessageBox.confirm('即将删除选中文件，是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: async (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      try {
        await batchDeleteFile({
          paths: checkedList.value
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        });
        close();
        refreshList();
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
}

/**
 * @description: 处理打开
 * @param {FileInfo} item 文件项
 */
function handleOpen(item: FileInfo) {
  if (item.type === 'directory') {
    useRouter().push({
      name: route.name as string,
      query: {
        path: item.path
      }
    });
  } else {
    // TODO: 浏览文件
  }
}
</script>

<style lang="scss" scoped>
.storage {
  height: 100%;
  display: flex;
  flex-direction: column;

  .storage__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .create-file-btn {
      margin-left: 12px;
    }
  }

  :deep(.all-check__list) {
    height: 0;
    flex-grow: 1;
  }
}
</style>
