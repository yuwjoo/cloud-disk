<template>
  <template v-if="$route.query.preview">
    <MdPreview :editorId="id" :modelValue="text" />
    <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
  </template>
  <MdEditor v-else id="md-editor" v-model="text" @onSave="onSave" />
</template>

<script setup lang="ts" name="MarkdownView">
import { useElectronApi } from '@/hooks/electron';
import { useRoute } from '@/hooks/vueRouter';
import { MdEditor, MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const scrollElement = document.documentElement;

const route = useRoute();

const electronApi = useElectronApi();

const text = ref('# Hello Editor');

const setText = async () => {
  text.value = await electronApi.file.readFile(route.query.filePath as string);
};

const onSave = async () => {
  await electronApi.file.writeFile(route.query.filePath as string, unref(text));
  ElMessage.success('保存成功');
};

setText();
</script>

<style lang="scss" scoped>
#md-editor {
  flex-grow: 1;
  width: 100%;
}
</style>
