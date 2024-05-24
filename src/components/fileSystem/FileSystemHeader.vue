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
    {{ value }}
    <BaseInput
      v-model="value"
      type="text"
      placeholder="请输入"
      prefix-icon="i-ep:search"
      suffix-icon="i-ep:circle-close"
    />
    <button @click="add">加入</button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  paths: {
    type: Array as PropType<string[]>,
    default: () => ['全部文件', '全功能']
  }
});

const value = ref('23423');

function add() {
  value.value += '0';
}

function handleClickItem(to: string | object) {
  console.log(to);
}
</script>
