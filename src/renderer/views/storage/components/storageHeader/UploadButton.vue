<!--
 * @FileName: 存储页-头部-上传按钮
 * @FilePath: \cloud-disk\src\views\storage\components\storageHeader\UploadButton.vue
 * @Author: YH
 * @Date: 2024-09-24 15:45:14
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 11:49:00
 * @Description: 
-->
<template>
  <el-dropdown ref="dropdownRef" @command="handleUploadCommand">
    <el-button class="upload-btn" type="primary" @click="handleUploadCommand('uploadFile')">
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

  <input class="select-file" ref="selectFileRef" type="file" multiple @change="handleSelectFile" />
</template>

<script setup lang="ts" name="UploadButton">
import type { ElDropdown } from 'element-plus';

const emit = defineEmits<{
  select: [files: File[]]; // 选中文件
}>();

const dropdownRef = ref<InstanceType<typeof ElDropdown>>(); // 下拉按钮组件ref

const selectFileRef = ref<HTMLInputElement>(); // 选择文件ref

/**
 * @description: 处理上传指令
 * @param {string} command 指令
 */
const handleUploadCommand = (command: string) => {
  dropdownRef.value!.handleClose();
  if (command === 'uploadFolder') {
    selectFileRef.value!.setAttribute('webkitdirectory', 'webkitdirectory');
  } else {
    selectFileRef.value!.removeAttribute('webkitdirectory');
  }
  selectFileRef.value!.value = '';
  selectFileRef.value!.click();
};

/**
 * @description: 处理选择的文件
 */
const handleSelectFile = () => {
  emit('select', [...(selectFileRef.value?.files || [])]);
};
</script>

<style lang="scss" scoped>
.upload-btn {
  outline-style: none;
}

.select-file {
  display: none;
}
</style>
