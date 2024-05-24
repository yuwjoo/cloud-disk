<!--
 * @FileName: 功能组件-面包屑项
 * @FilePath: \cloud-disk\src\components\feature\FeatureBreadcrumbItem.vue
 * @Author: YH
 * @Date: 2024-05-21 11:46:40
 * @LastEditors: YH
 * @LastEditTime: 2024-05-22 11:25:26
 * @Description: 
-->
<template>
  <BaseText :type="to ? 'primary' : 'default'" :clickable="!!to" @click="handleClick()">
    <slot></slot>
  </BaseText>
  <span class="flex items-center m-x-2 text-gray-300 last:hidden">
    <BaseIcon
      v-if="featureBreadcrumbProps?.separatorIcon"
      :class="featureBreadcrumbProps.separatorIcon"
    />
    <template v-else>
      {{ featureBreadcrumbProps?.separator }}
    </template>
  </span>
</template>

<script setup lang="ts">
import type { FeatureBreadcrumbItemEmits } from './FeatureBreadcrumbItem';
import { featureBreadcrumbKey } from './FeatureBreadcrumb';
import { featureBreadcrumbItemProps } from './FeatureBreadcrumbItem';
import { useRouter } from 'vue-router';

const emits = defineEmits<FeatureBreadcrumbItemEmits>();

const props = defineProps(featureBreadcrumbItemProps);

const router = useRouter();
const featureBreadcrumbProps = inject(featureBreadcrumbKey, undefined);

/**
 * @description: 处理点击
 */
function handleClick() {
  if (!props.to) return;
  if (!props.disabledRouter) router[props.replace ? 'replace' : 'push'](props.to);
  emits('clickItem', props.to);
}
</script>
