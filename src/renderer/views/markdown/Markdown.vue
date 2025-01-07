<template>
  <el-page-header class="page-header" :icon="ArrowLeft">
    <template #title>上一页</template>
    <template #content>
      <span> Markdown编辑器 </span>
    </template>
  </el-page-header>
  <MdEditor id="md-editor" v-model="text" @onSave="onSave" />
</template>

<script setup lang="ts" name="MarkdownView">
import { ArrowLeft } from '@element-plus/icons-vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');

const onSave = (v, h) => {
  console.log(v);

  h.then((html) => {
    console.log(html);
  });
};
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: var(--spacing-medium);
}

#md-editor {
  flex-grow: 1;
  width: 100%;
}
</style>
