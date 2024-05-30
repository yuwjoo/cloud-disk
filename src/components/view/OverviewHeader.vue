<template>
  <div class="p-b-5 text-sm">
    <div v-if="paths.length" class="flex items-center">
      <BaseText type="primary" clickable>返回上一级</BaseText>
      <span class="w-0.5 h-1em bg-gray-300 m-x-3"></span>
      <FeatureBreadcrumb separator-icon="before:i-ep:arrow-right-bold">
        <FeatureBreadcrumbItem
          v-for="(path, index) in paths"
          :key="index"
          :to="paths[index + 1] ? path : undefined"
          disabled-router
          @click-item="handleClickItem"
        >
          {{ path }}
        </FeatureBreadcrumbItem>
      </FeatureBreadcrumb>
    </div>
    <BaseText v-else>全部文件</BaseText>
  </div>
</template>

<script setup lang="ts">
defineProps({
  paths: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

function handleClickItem(to: string | object) {
  console.log(to);
}
</script>
