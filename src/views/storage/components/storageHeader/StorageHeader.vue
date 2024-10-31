<!--
 * @FileName: 存储页-头部
 * @FilePath: \cloud-disk\src\views\storage\components\storageHeader\StorageHeader.vue
 * @Author: YH
 * @Date: 2024-10-31 11:11:12
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 13:24:18
 * @Description: 
-->
<template>
  <div class="storage-header">
    <breadcrumb class="storage-header__left" :path="path" />

    <div class="storage-header__right">
      <upload-button @select="handleUploadFile" />

      <el-button
        class="storage-header__right-create-btn"
        type="primary"
        @click="handleCreateFolder"
      >
        <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
        <span>新建文件夹</span>
      </el-button>

      <el-button type="danger" :disabled="!checkedList.length" @click="handleBatchDelete">
        <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
        <span>批量删除</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="StorageHeader">
import Breadcrumb from './Breadcrumb.vue';
import UploadButton from './UploadButton.vue';
import { batchDeleteFile, createFile } from '@/api/common/storage';
import { addUploadTask } from '@/utils/uploadManager';

const emit = defineEmits<{
  change: []; // 文件列表变化
}>();

const props = defineProps({
  path: {
    type: String,
    required: true
  }, // 目录路径
  checkedList: {
    type: Array as PropType<string[]>,
    required: true
  } // 选中文件列表
});

/**
 * @description: 处理文件上传
 * @param {File[]} files 选择的文件
 */
const handleUploadFile = (files: File[]) => {
  for (const file of files) {
    addUploadTask({
      file,
      uploadName: file.name,
      uploadPath: props.path,
      onSuccess: () => {
        emit('change');
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
          parent: props.path,
          name: ctx.inputValue,
          isDirectory: true
        });
        ElMessage({
          type: 'success',
          message: '创建成功'
        });
        close();
        emit('change');
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
          paths: props.checkedList
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        });
        close();
        emit('change');
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
};
</script>

<style lang="scss" scoped>
.storage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .storage-header__right-create-btn {
    margin-left: 12px;
  }
}
</style>
