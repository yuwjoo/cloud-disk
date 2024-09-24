<!--
 * @FileName: 页面-存储
 * @FilePath: \cloud-disk\src\views\storage\StorageView.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-09-24 15:17:56
 * @Description: 
-->
<template>
  <div class="storage">
    <div class="storage__header">
      <BreadcrumbComp v-model:parent="search.parent" />

      <div class="storage__header-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadcrumbComp from './components/BreadcrumbComp.vue';
import { useFetchList, useSearch } from './hooks/storage-view';

const { search } = useSearch();
const { list, loading } = useFetchList(search);
</script>
