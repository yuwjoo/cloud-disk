<!--
 * @FileName: 功能组件-复选框
 * @FilePath: \cloud-disk\src\components\feature\FeatureCheckbox.vue
 * @Author: YH
 * @Date: 2024-05-22 16:05:38
 * @LastEditors: YH
 * @LastEditTime: 2024-05-23 15:15:41
 * @Description: 
-->
<template>
  <BaseCheckbox
    :checked="innerChecked"
    :indeterminate="indeterminate"
    :disabled="innerDisabled"
    @click="handleClick()"
  >
    <slot></slot>
  </BaseCheckbox>
</template>

<script setup lang="ts">
import type { FeatureCheckboxSlots, FeatureCheckboxEmits } from './FeatureCheckbox';
import { featureCheckboxProps } from './FeatureCheckbox';
import { featureCheckboxGroupKey } from './FeatureCheckboxGroup';

defineSlots<FeatureCheckboxSlots>();

const emits = defineEmits<FeatureCheckboxEmits>();

const props = defineProps(featureCheckboxProps);

const checked = defineModel<boolean>({ default: false }); //选中状态

const featureCheckboxGroupContext = inject(featureCheckboxGroupKey, undefined);

const innerDisabled = computed(() => props.disabled ?? featureCheckboxGroupContext?.props.disabled); // 内部禁用状态
const innerChecked = computed(() => {
  if (featureCheckboxGroupContext) {
    return featureCheckboxGroupContext.model.value.some((v) => v === props.value);
  } else {
    return checked.value;
  }
}); // 内部选中状态

/**
 * @description: 处理点击
 */
function handleClick() {
  if (innerDisabled.value) return;
  if (featureCheckboxGroupContext && props.value) {
    featureCheckboxGroupContext.switchCheckbox(props.value, !innerChecked.value);
  }
  checked.value = !innerChecked.value;
  nextTick(() => {
    emits('change', checked.value);
  });
}
</script>
