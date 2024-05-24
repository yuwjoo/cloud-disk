<!--
 * @FileName: 功能组件-复选框组
 * @FilePath: \cloud-disk\src\components\feature\FeatureCheckboxGroup.vue
 * @Author: YH
 * @Date: 2024-05-22 16:25:53
 * @LastEditors: YH
 * @LastEditTime: 2024-05-23 13:14:40
 * @Description: 
-->
<template>
  <component v-if="tag" :is="tag"><slot></slot></component>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import type {
  FeatureCheckboxGroupSlots,
  FeatureCheckboxGroupEmits,
  FeatureCheckboxGroupModel
} from './FeatureCheckboxGroup';
import { featureCheckboxGroupKey, featureCheckboxGroupProps } from './FeatureCheckboxGroup';

defineSlots<FeatureCheckboxGroupSlots>();

const emits = defineEmits<FeatureCheckboxGroupEmits>();

const props = defineProps(featureCheckboxGroupProps);

const model = defineModel<FeatureCheckboxGroupModel>({ default: [] });

provide(featureCheckboxGroupKey, { props, model, switchCheckbox });

/**
 * @description: 切换选中状态
 * @param {FeatureCheckboxGroupModel[0]} value 选中值
 * @param {boolean} selected 是否选中
 */
function switchCheckbox(value: FeatureCheckboxGroupModel[0], selected: boolean) {
  const set = new Set(model.value);
  set[selected ? 'add' : 'delete'](value);
  model.value = [...set];
  nextTick(() => {
    emits('change', model.value);
  });
}
</script>
