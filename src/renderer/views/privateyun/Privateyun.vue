<!--
 * @FileName: 私有云盘
 * @FilePath: \cloud-disk\src\renderer\views\privateyun\Privateyun.vue
 * @Author: YH
 * @Date: 2024-11-27 15:24:31
 * @LastEditors: YH
 * @LastEditTime: 2024-11-27 15:25:10
 * @Description: 
-->
<template>
  <div class="privateyun" v-loading="loading">
    <div class="privateyun-header">
      <DirBreadcrumb class="privateyun-header__left" :path="search.dir" />

      <div class="privateyun-header__right">
        <UploadButton @select="handleUploadFile" />

        <ElButton
          class="privateyun-header__right-create-btn"
          type="primary"
          @click="handleCreateFolder"
        >
          <ElIcon class="el-icon--left"><IEpFolderAdd /></ElIcon>
          <span>新建文件夹</span>
        </ElButton>

        <ElButton v-if="checkedList.length" type="danger" @click="handleBatchDelete">
          <ElIcon class="el-icon--left"><IEpDelete /></ElIcon>
          <span>批量删除</span>
        </ElButton>
      </div>
    </div>

    <FileList
      v-model:checked-list="checkedList"
      :list="list"
      :parse-item="handleParseItem"
      @click-item="handleClickItem"
      @operate-item="handleOperateItem"
    />
  </div>
</template>

<script setup lang="ts" name="BaiduyunMain">
import { useList } from './hooks/list';
import { useSearch } from './hooks/search';
import { useHeader } from './hooks/header';

const { search } = useSearch();

const {
  list,
  checkedList,
  loading,
  fetchList,
  handleParseItem,
  handleClickItem,
  handleOperateItem
} = useList(search);

const { handleUploadFile, handleCreateFolder, handleBatchDelete } = useHeader(
  search,
  checkedList,
  fetchList
);
</script>

<style lang="scss" scoped>
.privateyun {
  height: 100%;
  display: flex;
  flex-direction: column;

  .privateyun-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);

    .privateyun-header__right-create-btn {
      margin-left: 12px;
    }
  }
}
</style>
