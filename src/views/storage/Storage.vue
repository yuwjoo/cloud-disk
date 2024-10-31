<!--
 * @FileName: 存储页
 * @FilePath: \cloud-disk\src\views\storage\Storage.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 14:50:24
 * @Description: 
-->
<template>
  <div class="storage" v-loading="loading">
    <storage-header
      class="storage__header"
      :path="search.parent"
      :checked-list="checkedList"
      @change="refreshList()"
    />
    <storage-list
      class="storage__list"
      v-model:checked-list="checkedList"
      :list="list"
      @change="refreshList()"
    />
  </div>
</template>

<script setup lang="ts" name="StorageView">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import StorageHeader from './components/storageHeader/StorageHeader.vue';
import StorageList from './components/storageList/StorageList.vue';
import { useUserStore } from '@/store/user';
import type { Search } from './types/storage';
import { useLayoutStore } from '@/store/layout';
import type { FileInfo } from '@/types/file';
import { getFileList } from '@/api/common/storage';

const route = useRoute();

const userStore = useUserStore();

const layoutStore = useLayoutStore();

const search = reactive<Search>({
  parent: (route.query.path as string) || userStore.user?.storageOrigin || '', // 父级路径
  searchValue: '' // 模糊搜索值
});

const list = ref<FileInfo[]>([]); // 文件列表

const loading = ref<boolean>(false); // 加载中

const checkedList = ref<string[]>([]); // 选中列表

/**
 * @description: 刷新列表
 */
const refreshList = async () => {
  loading.value = true;
  try {
    const res = await getFileList({ parent: search.parent });
    list.value = res.data.records || [];
    checkedList.value = [];
  } catch (err) {
    /* empty */
  }
  loading.value = false;
};

onBeforeRouteUpdate((to) => {
  search.parent = (to.query.path as string) || userStore.user?.storageOrigin || '';
  refreshList();
});

watchEffect(() => {
  search.searchValue = layoutStore.searchValue;
});

refreshList();
</script>

<style lang="scss" scoped>
.storage {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.all-check__list) {
    height: 0;
    flex-grow: 1;
  }
}
</style>
