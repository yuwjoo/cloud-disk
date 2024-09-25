<!--
 * @FileName: 带全选文件列表
 * @FilePath: \cloud-disk\src\views\storage\components\AllCheckFileListComp.vue
 * @Author: YH
 * @Date: 2024-09-25 10:29:13
 * @LastEditors: YH
 * @LastEditTime: 2024-09-25 11:57:29
 * @Description: 
-->
<template>
  <el-checkbox
    class="all-check__checked"
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>

  <el-checkbox-group class="all-check__list" v-model="checkedList" @change="handleCheckGroupChange">
    <slot v-for="item in list" :key="item.path" :item="item"></slot>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import type { FileInfo } from '@/api/types/storage';
import type { CheckboxValueType } from 'element-plus';

const props = defineProps({
  list: {
    type: Object as PropType<FileInfo[]>,
    required: true
  } // 列表数据
});
const checkAll = ref(false); // 是否全选
const isIndeterminate = ref(false); // 是否中间状态
const checkedList = defineModel<string[]>({ required: true }); // 选中列表

/**
 * @description: 处理全选
 * @param {CheckboxValueType} val 选中状态
 */
function handleCheckAllChange(val: CheckboxValueType) {
  checkedList.value = val ? props.list.map((item) => item.path) : [];
  isIndeterminate.value = false;
}

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
function handleCheckGroupChange(value: CheckboxValueType[]) {
  const checkedCount = value.length;
  checkAll.value = checkedCount === props.list.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.list.length;
}
</script>

<style lang="scss" scoped>
.all-check__checked {
  margin-bottom: var(--spacing-small);
}

.all-check__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-medium);
  overflow-y: auto;
  align-content: flex-start;
}
</style>
