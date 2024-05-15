<template>
  <div class="flex justify-between p-b-6">
    <div class="font-bold">全部文件</div>
    <div class="cursor-pointer">
      <i class="block i-ep:files" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  filePath: {}
});
</script>
