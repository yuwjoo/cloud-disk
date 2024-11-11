<!--
 * @FileName: 文件列表
 * @FilePath: \cloud-disk\src\renderer\components\FileList.vue
 * @Author: YH
 * @Date: 2024-09-25 10:29:13
 * @LastEditors: YH
 * @LastEditTime: 2024-11-11 16:20:30
 * @Description: 
-->
<template>
  <div class="file-list">
    <el-checkbox
      class="file-list__checked"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>

    <el-checkbox-group
      v-if="list.length > 0"
      class="file-list__list"
      v-model="checkedPathList"
      @change="handleCheckGroupChange"
    >
      <slot v-for="item in list" :key="item.path" :item="item"></slot>
    </el-checkbox-group>

    <el-empty v-else class="file-list__empty" description="暂无数据" />
  </div>
</template>

<script setup lang="ts" name="FileList">
import type { FileInfo } from '@/types/file';
import type { CheckboxValueType } from 'element-plus';
import type { PropType } from 'vue';

const emit = defineEmits<{
  checked: [checkedPathList: string[]]; // 复选框选中
}>();

const props = defineProps({
  list: {
    type: Object as PropType<FileInfo[]>,
    required: true
  } // 列表数据
});

const checkAll = ref(false); // 是否全选

const isIndeterminate = ref(false); // 是否中间状态

const checkedPathList = ref<string[]>([]); // 选中路径列表

/**
 * @description: 处理全选
 * @param {CheckboxValueType} val 选中状态
 */
const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedPathList.value = val ? props.list.map((item) => item.path) : [];
  isIndeterminate.value = false;
  emit('checked', checkedPathList.value);
};

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
const handleCheckGroupChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount > 0 && checkedCount === props.list.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.list.length;
  emit('checked', checkedPathList.value);
};

/**
 * @description: 重置选中数据
 */
const resetChecked = () => {
  checkedPathList.value = [];
  emit('checked', checkedPathList.value);
};

/**
 * @description: 设置选中数据
 */
const setChecked = (value: string[]) => {
  checkedPathList.value = [...value];
  emit('checked', checkedPathList.value);
};

defineExpose({
  resetChecked,
  setChecked
});
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .file-list__checked {
    align-self: flex-start;
  }

  .file-list__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    overflow-y: auto;
    align-content: flex-start;
    height: 0;
    flex-grow: 1;
  }

  .file-list__empty {
    margin: var(--spacing-large) auto 0;
  }
}
</style>
