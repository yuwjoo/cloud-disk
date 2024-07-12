<!--
 * @FileName: 页面-总览-上传文件
 * @FilePath: \cloud-disk\src\views\overview\components\OverviewUploadFile.vue
 * @Author: YH
 * @Date: 2024-07-12 13:33:23
 * @LastEditors: YH
 * @LastEditTime: 2024-07-12 15:38:56
 * @Description: 
-->
<template>
  <input class="overview-upload-file" ref="uploadRef" type="file" multiple @change="handleChange" />
</template>

<script setup lang="ts">
const uploadRef = ref<HTMLInputElement | null>(null); // 上传 input ref

/**
 * @description: 打开文件选择框
 * @param {boolean} selectFolder 是否选择文件夹
 */
function open(selectFolder: boolean) {
  if (selectFolder) {
    uploadRef.value?.setAttribute('webkitdirectory', 'webkitdirectory');
  } else {
    uploadRef.value?.removeAttribute('webkitdirectory');
  }
  uploadRef.value?.click();
}

/**
 * @description: 处理文件改变
 */
function handleChange() {
  console.log(uploadRef.value?.files);
}

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.overview-upload-file {
  display: none;
}
</style>
