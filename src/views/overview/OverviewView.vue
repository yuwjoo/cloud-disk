<!--
 * @FileName: 页面-总览
 * @FilePath: \cloud-disk\src\views\overview\OverviewView.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-09-22 21:41:13
 * @Description: 
-->
<template>
  <div class="overview" v-loading="loading">
    <!-- 头部 start -->
    <overview-header
      :parentPath="parentPath"
      :checkedList="checkedList"
      @nav="
        (ev) => {
          parentPath = ev;
          getFileList();
        }
      "
      @add-file="handleFileAdd($event)"
      @change="getFileList()"
    />
    <!-- 头部 end -->

    <el-checkbox
      class="overview__all-check"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>

    <!-- 列表 start -->
    <el-checkbox-group
      v-if="filterFileList.length > 0"
      class="overview__list"
      v-model="checkedList"
      @change="handleCheckGroupChange"
    >
      <overview-file-item
        v-show="!item.hidden"
        v-for="(item, index) in filterFileList"
        :key="item.fullPath"
        :item="item"
        @enter="handleFileEnter(item)"
        @delete="handleFileDelete(index)"
        @modify="handleFileModify($event as unknown as any, index)"
      />
    </el-checkbox-group>
    <!-- 列表 end -->

    <!-- 空状态 start -->
    <el-empty v-else class="overview__empty" description="暂无数据" />
    <!-- 空状态 end -->
  </div>
</template>

<script setup lang="ts">
import OverviewFileItem from './components/overviewFileItem.vue';
import OverviewHeader from './components/overviewHeader.vue';
import { useFileManage } from './hooks/fileManage';
import type { CheckboxValueType } from 'element-plus';
import type { FileList } from './types/fileManage';
import { useFileSystem } from '@/store/fileSystem';
import { storeToRefs } from 'pinia';

const {
  loading,
  parentPath,
  pathList,
  fileList,
  checkAll,
  isIndeterminate,
  checkedList,
  deleteLoading,
  getFileList,
  createFolder,
  deleteFile
} = useFileManage();
const { searchValue } = storeToRefs(useFileSystem());
const filterFileList = computed(() => {
  return fileList.value.map((item) => ({
    ...item,
    hidden: !item.name.includes(searchValue.value)
  })) as unknown as any;
});

/**
 * @description: 处理全选
 * @param {CheckboxValueType} val 选中状态
 */
function handleCheckAllChange(val: CheckboxValueType) {
  checkedList.value = val ? fileList.value.map((item) => item.path) : [];
  isIndeterminate.value = false;
}

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
function handleCheckGroupChange(value: CheckboxValueType[]) {
  const checkedCount = value.length;
  checkAll.value = checkedCount === fileList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < fileList.value.length;
}

/**
 * @description: 处理文件添加
 * @param {FileList[0]} item 数据
 */
function handleFileAdd(item: FileList[0]) {
  let pos: number = -1;
  for (let i = fileList.value.length - 1; i >= 0; i--) {
    if (fileList.value[i].isDirectory !== item.isDirectory) continue;
    pos = i;
    if (fileList.value[i].name < item.name) {
      pos += 1;
      break;
    }
  }
  fileList.value.splice(pos, 0, item);
}

/**
 * @description: 处理文件进入
 * @param {FileList[0]} item 数据
 */
function handleFileEnter(item: FileList[0]) {
  if (item.isDirectory) {
    parentPath.value = item.path;
    getFileList();
  }
}

/**
 * @description: 处理文件删除
 * @param {number} index 被删除的下标
 */
function handleFileDelete(index: number) {
  fileList.value.splice(index, 1);
}

/**
 * @description: 处理文件改修改
 * @param {FileList[0]} item 新数据
 * @param {number} index 被修改的下标
 */
function handleFileModify(item: FileList[0], index: number) {
  fileList.value.splice(index, 1);
  handleFileAdd(item);
}
</script>

<style lang="scss" scoped>
.overview {
  height: 100%;
  display: flex;
  flex-direction: column;

  .overview__all-check {
    margin-bottom: var(--spacing-small);
    align-self: flex-start;
  }

  .overview__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    overflow-y: auto;
    align-content: flex-start;
    height: 0;
    flex-grow: 1;
  }

  .overview__empty {
    flex-grow: 1;
  }

  .overview__select-file {
    display: none;
  }
}
</style>
