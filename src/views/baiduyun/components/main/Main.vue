<!--
 * @FileName: 百度云盘-主界面
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\components\main\Main.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-27 15:12:42
 * @Description: 
-->
<template>
  <div class="baiduyun" v-loading="loading">
    <div class="baiduyun-header">
      <DirBreadcrumb class="baiduyun-header__left" :path="search.dir" />

      <div class="baiduyun-header__right">
        <UploadButton @select="handleUploadFile" />

        <ElButton
          class="baiduyun-header__right-create-btn"
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
.baiduyun {
  height: 100%;
  display: flex;
  flex-direction: column;

  .baiduyun-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);

    .baiduyun-header__right-create-btn {
      margin-left: 12px;
    }
  }
}
</style>
