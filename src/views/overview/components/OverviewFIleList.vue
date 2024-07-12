<!--
 * @FileName: 页面-总览-文件列表
 * @FilePath: \cloud-disk\src\views\overview\components\OverviewFIleList.vue
 * @Author: YH
 * @Date: 2024-07-12 13:33:23
 * @LastEditors: YH
 * @LastEditTime: 2024-07-12 17:57:59
 * @Description: 
-->
<template>
  <div class="overview-file-list">
    <div class="overview-file-list__item">
      <img
        class="overview-file-list__item-cover"
        src="@/assets/images/fileSystem/small/compressedFile.png"
        alt=""
        @dragstart.prevent
      />
      <div class="overview-file-list__item-name">测试文件</div>
      <div class="overview-file-list__item-date">2024-08-02 10:21</div>
    </div>
  </div>
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
