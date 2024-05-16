<template>
  <label
    :aria-checked="checked"
    class="inline-block w-4 h-4 rounded-1 border border-solid border-gray-300 aria-checked:border-primary-600 aria-checked:bg-primary-600 text-gray-100 text-sm"
  >
    <input class="hidden" type="checkbox" :checked="checked" @change="handleChange" />
    <i :aria-checked="checked" class="block aria-checked:i-ep:select"></i>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  // 设置不确定状态
  indeterminate: {
    type: Boolean,
    default: true
  }
});
const checked = defineModel<boolean>();
// <el-icon><Select /></el-icon>
// <el-icon><SemiSelect /></el-icon>
/**
 * @description: 处理改变
 * @param {Event} event 事件对象
 */
function handleChange(event: Event) {
  console.log('改变');
  checked.value = (event.target as HTMLInputElement).checked;
}
</script>
