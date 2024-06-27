<template>
  <OverviewHeader />
  <OverviewFileList :file-list="fileList" />

  <FeatureFloatingButton @click="handleClickUploadFile()">
    <div class="flex flex-col justify-center items-center">
      <BaseIcon class="i-ep:upload" />
      <div class="text-3.5 m-t-1">上传文件</div>
    </div>
  </FeatureFloatingButton>

  <input
    ref="uploadInputRef"
    class="hidden"
    type="file"
    multiple
    @change="handleChangeUploadFile()"
  />
</template>

<script setup lang="ts">
import type { GetDirectoryListResponseData } from 'types/src/request/apis/overview';
import { getDirectoryList } from '@/request/apis/overview';
import { putFile } from '@/utils/oss';

const fileList = ref<Required<GetDirectoryListResponseData>['data']['directoryList']>([]); // 文件列表
const uploadInputRef = ref<HTMLInputElement | null>(null); // 上传输入框ref

getDirectoryList({}).then((res) => {
  fileList.value = res.data?.directoryList || [];
});

/**
 * @description: 处理点击上传文件
 */
function handleClickUploadFile() {
  console.log('点击上传文件');
  uploadInputRef.value?.click();
}

/**
 * @description: 处理上传文件改变
 */
function handleChangeUploadFile() {
  const files = [...(uploadInputRef.value?.files || [])];
  files.forEach((file) => {
    putFile(file);
  });
}
</script>

<style></style>
