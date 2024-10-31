<!--
 * @FileName: 存储页-列表
 * @FilePath: \cloud-disk\src\views\storage\components\storageList\StorageList.vue
 * @Author: YH
 * @Date: 2024-10-31 13:25:53
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 14:28:23
 * @Description: 
-->
<template>
  <div class="storage-list">
    <all-check-list v-model:checked-list="checkedList" :list="list" id="path">
      <template #default="{ item }">
        <file-item :item="item" @change="emit('change')" />
      </template>
    </all-check-list>
  </div>
</template>

<script setup lang="ts" name="StorageList">
import type { FileInfo } from '@/types/file';
import AllCheckList from './AllCheckList.vue';
import FileItem from './FileItem.vue';

const emit = defineEmits<{
  change: []; // 文件改变
}>();

defineProps({
  list: {
    type: Object as PropType<FileInfo[]>,
    required: true
  } // 列表数据
});

const checkedList = defineModel<string[]>('checkedList', { required: true }); // 选中列表
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
