<!--
 * @FileName: 功能组件-面包屑
 * @FilePath: \cloud-disk\src\components\feature\FeatureBreadcrumb.vue
 * @Author: YH
 * @Date: 2024-05-21 11:46:40
 * @LastEditors: YH
 * @LastEditTime: 2024-05-21 17:03:16
 * @Description: 
-->
<template>
  <div class="flex items-center">
    <slot></slot>
  </div>
</template>

<script setup lang="tsx">
import type { FeatureBreadcrumbSlots } from './FeatureBreadcrumb';
import { featureBreadcrumbProps, featureBreadcrumbKey } from './FeatureBreadcrumb';

defineSlots<FeatureBreadcrumbSlots>();

const props = defineProps(featureBreadcrumbProps);

provide(featureBreadcrumbKey, props);
</script>
