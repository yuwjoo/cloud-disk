<!--
 * @FileName: 百度云存储页
 * @FilePath: \cloud-disk\src\renderer\views\storage\Storage.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-09 00:45:26
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
import type { Search } from './types/storage';
import { useLayoutStore } from '@/store/layout';
import type { FileInfo } from '@/types/file';
import { getBaiduyunFileList } from '@/api/baiduyun';

const route = useRoute();

const layoutStore = useLayoutStore();

const search = reactive<Search>({
  parent: (route.query.path as string) || '/', // 父级路径
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
    const res = await getBaiduyunFileList({ parent: search.parent });
    list.value = res.data.records || [];
    checkedList.value = [];
  } catch (err) {
    /* empty */
  }
  loading.value = false;
};

onBeforeRouteUpdate((to) => {
  search.parent = (to.query.path as string) || '/';
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

  .storage__header {
    margin-bottom: var(--spacing-small);
  }
}
</style>
