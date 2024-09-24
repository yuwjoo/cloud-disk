<template>
  <el-dropdown ref="dropdownRef" @command="handleUploadCommand">
    <el-button
      class="overview-header__dropdown-btn"
      type="primary"
      @click="handleUploadCommand('uploadFile')"
    >
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

<script setup lang="ts">
import { addUploadTask } from '@/utils/uploadManager';
import type { ElDropdown } from 'element-plus';
import type { Search } from '../types/storage-view';

const emits = defineEmits<{
  change: [];
}>();
const props = defineProps({
  search: {
    type: Object as PropType<Search>,
    required: true
  }
});

const dropdownRef = ref<InstanceType<typeof ElDropdown>>(); // 下拉按钮组件ref
const selectFileRef = ref<HTMLInputElement>(); // 选择文件ref

/**
 * @description: 处理上传指令
 * @param {string} command 指令
 */
function handleUploadCommand(command: string) {
  dropdownRef.value!.handleClose();
  if (command === 'uploadFolder') {
    selectFileRef.value!.setAttribute('webkitdirectory', 'webkitdirectory');
  } else {
    selectFileRef.value!.removeAttribute('webkitdirectory');
  }
  selectFileRef.value!.value = '';
  selectFileRef.value!.click();
}

/**
 * @description: 处理选择的文件
 */
function handleSelectFile() {
  for (const file of selectFileRef.value!.files || []) {
    addUploadTask({
      file,
      uploadName: file.name,
      uploadPath: props.search.parent,
      onSuccess: () => {
        emits('change');
      }
    });
  }
}
</script>
