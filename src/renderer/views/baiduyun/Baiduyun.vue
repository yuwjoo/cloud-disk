<!--
 * @FileName: 百度云盘
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\Baiduyun.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-11 17:12:56
 * @Description: 
-->
<template>
  <div class="baiduyun" v-loading="loading">
    <div class="baiduyun-header">
      <dir-breadcrumb class="baiduyun-header__left" :path="search.parent" />

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

        <el-button v-if="checkedPathList.length" type="danger" @click="handleBatchDelete">
          <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
          <span>批量删除</span>
        </el-button>
      </div>
    </div>

    <file-list ref="fileListRef" :list="list" @checked="checkedPathList = $event">
      <template #default="{ item }">
        <file-item
          :item="item"
          @download="handleDownload(item)"
          @rename="handleRename(item)"
          @delete="handleDelete(item)"
        />
      </template>
    </file-list>
  </div>
</template>

<script setup lang="ts" name="BaiduyunView">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { getBaiduyunFileList } from '@/api/baiduyun';
import { addUploadTask } from '@/utils/uploadManager';
import {
  batchDeleteFile,
  createFile,
  deleteFile,
  downloadFile,
  renameFile
} from '@/api/common/storage';
import type { Search } from './types/baiduyun';
import type { FileInfo } from '@/types/file';
import type FileList from '@/components/FileList.vue';

const route = useRoute();

const search = reactive<Search>({
  parent: (route.query.path as string) || '/', // 父级路径
  searchValue: '' // 模糊搜索值
});

const list = ref<FileInfo[]>([]); // 文件列表

const loading = ref<boolean>(false); // 加载中

const checkedPathList = ref<string[]>([]); // 选中路径列表

const fileListRef = ref<InstanceType<typeof FileList>>(); // 文件列表ref

/**
 * @description: 刷新列表
 */
const refreshList = async () => {
  loading.value = true;
  try {
    const res = await getBaiduyunFileList({ dir: search.parent, current: 1, size: 1000 });
    list.value = res.data.records || [];
    fileListRef.value?.resetChecked();
  } catch (err) {
    /* empty */
  }
  loading.value = false;
};

/**
 * @description: 处理文件上传
 * @param {File[]} files 选择的文件
 */
const handleUploadFile = (files: File[]) => {
  for (const file of files) {
    addUploadTask({
      file,
      uploadName: file.name,
      uploadPath: search.parent,
      onSuccess: () => {
        refreshList();
      }
    });
  }
};

/**
 * @description: 处理创建文件夹
 */
const handleCreateFolder = () => {
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
};

/**
 * @description: 处理批量删除
 */
const handleBatchDelete = () => {
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
          paths: checkedPathList.value
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
};

/**
 * @description: 处理下载
 */
const handleDownload = (item: FileInfo) => {
  downloadFile({ path: item.path }).then((res) => {
    const a = document.createElement('a');
    a.href = res.data;
    a.download = 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

/**
 * @description: 处理重命名
 */
const handleRename = (item: FileInfo) => {
  ElMessageBox.prompt(`将“${item.name}”修改为：`, '重命名', {
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
        await renameFile({
          parent: item.parent,
          oldName: item.name,
          newName: ctx.inputValue
        });
        ElMessage({
          type: 'success',
          message: '修改成功'
        });
        close();
        refreshList();
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
};

/**
 * @description: 处理删除
 */
const handleDelete = (item: FileInfo) => {
  ElMessageBox.confirm(`即将删除“${item.name}”，是否继续?`, '提示', {
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
        await deleteFile({
          path: item.path
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
};

onBeforeRouteUpdate((to) => {
  search.parent = (to.query.path as string) || '/';
  refreshList();
});

refreshList();
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
