<!--
 * @FileName: 功能组件-悬浮按钮
 * @FilePath: \cloud-disk\src\components\feature\FeatureFloatingButton.vue
 * @Author: YH
 * @Date: 2024-05-21 11:46:40
 * @LastEditors: YH
 * @LastEditTime: 2024-06-12 14:05:21
 * @Description: 
-->
<template>
  <div
    class="fixed right-10 flex items-center justify-center cursor-pointer w-20 h-20 shadow-xl rounded-full bg-gray-100 dark:shadow-black/10 dark:bg-primary-600/10"
    :style="{ bottom: `calc(3rem + ${offset}px)` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="tsx">
import type { FeatureFloatingButtonSlots } from './FeatureFloatingButton';
import { featureFloatingButtonProps } from './FeatureFloatingButton';

defineSlots<FeatureFloatingButtonSlots>();

defineProps(featureFloatingButtonProps);
</script>
