<!--
 * @FileName: 存储页-列表-带全选列表
 * @FilePath: \cloud-disk\src\views\storage\components\storageList\AllCheckList.vue
 * @Author: YH
 * @Date: 2024-09-25 10:29:13
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 17:30:13
 * @Description: 
-->
<template>
  <div class="all-check-list">
    <el-checkbox
      class="all-check-list__checked"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>

    <el-checkbox-group
      v-if="list.length > 0"
      class="all-check-list__list"
      v-model="checkedList"
      @change="handleCheckGroupChange"
    >
      <slot v-for="item in list" :key="item[id]" :item="item"></slot>
    </el-checkbox-group>

    <el-empty v-else class="all-check-list__empty" description="暂无数据" />
  </div>
</template>

<script setup lang="ts" name="AllCheckList">
import type { FileInfo } from '@/types/file';
import type { CheckboxValueType } from 'element-plus';
import type { PropType } from 'vue';

const props = defineProps({
  list: {
    type: Object as PropType<FileInfo[]>,
    required: true
  }, // 列表数据
  id: {
    type: String as PropType<keyof FileInfo>,
    required: true
  } // 选中标识key
});

const checkAll = ref(false); // 是否全选

const isIndeterminate = ref(false); // 是否中间状态

const checkedList = defineModel<any[]>('checkedList', { required: true }); // 选中列表

/**
 * @description: 处理全选
 * @param {CheckboxValueType} val 选中状态
 */
const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedList.value = val ? props.list.map((item) => item[props.id]) : [];
  isIndeterminate.value = false;
};

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
const handleCheckGroupChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount > 0 && checkedCount === props.list.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.list.length;
};

watchEffect(() => {
  handleCheckGroupChange(checkedList.value);
});
</script>

<style lang="scss" scoped>
.all-check-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .all-check-list__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    overflow-y: auto;
    align-content: flex-start;
    height: 0;
    flex-grow: 1;
  }

  .all-check-list__empty {
    margin: var(--spacing-large) auto 0;
  }
}
</style>
