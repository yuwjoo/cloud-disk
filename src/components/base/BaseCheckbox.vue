<template>
  <div
    class="group flex items-center select-none cursor-pointer data-[disabled=true]:cursor-no-drop"
    :data-disabled="disabled"
    :data-checked="checked"
    @click="handleChange"
  >
    <div
      v-if="indeterminate"
      class="flex items-center justify-center w-4 h-4 overflow-hidden text-3 border border-solid border-primary-600 rounded-1 text-gray-100 bg-primary-600 group-[[data-disabled=true]]:bg-gray-100 group-[[data-disabled=true]]:text-primary-400"
    >
      <i class="i-ep:semi-select"></i>
    </div>
    <div
      v-else
      class="flex items-center justify-center w-4 h-4 overflow-hidden text-3 border border-solid border-gray-300 rounded-1 text-gray-100 group-[[data-disabled=false]:hover]:border-primary-600 group-[[data-checked=true]]:border-primary-600 group-[[data-checked=true]]:bg-primary-600 group-[[data-disabled=true]]:border-gray-300! group-[[data-disabled=true]]:bg-gray-100! group-[[data-disabled=true]]:text-primary-400!"
    >
      <i class="group-[[data-checked=true]]:i-ep:select"></i>
    </div>
    <div v-if="$slots.default" class="m-l-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 不确定状态
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  change: [value: boolean];
}>();

defineSlots<{
  default(): any;
}>();

const checked = defineModel<boolean>(); // 选中状态

/**
 * @description: 处理改变
 */
function handleChange() {
  if (props.disabled) return;
  checked.value = !checked.value;
  emits('change', checked.value);
}
</script>