<template>
  <ElInput
    v-if="isEditTitle"
    ref="titleInputRef"
    class="markdown__title markdown__title-input"
    v-model="title"
    placeholder="未定义"
    @blur="isEditTitle = false"
  />
  <div
    v-else
    class="markdown__title markdown__title-label"
    :class="{ 'markdown__title-label--empty': !title }"
    @click="handleEditTitle"
  >
    <ElBadge is-dot>
      <span class="markdown__title-text">
        {{ title || '未定义' }}
        <ElIcon class="markdown__title-edit">
          <Edit />
        </ElIcon>
      </span>
    </ElBadge>
  </div>
  <MdEditor id="md-editor" v-model="text" @onSave="onSave" />
</template>

<script setup lang="ts" name="MarkdownView">
import { useElectronApi } from '@/hooks/electron';
import { Edit } from '@element-plus/icons-vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const electronApi = useElectronApi();
const titleInputRef = useTemplateRef('titleInputRef');
const title = ref('');
const isEditTitle = ref(false);
const text = ref('# Hello Editor');

const handleEditTitle = () => {
  isEditTitle.value = true;
  nextTick(() => {
    titleInputRef.value?.select();
  });
};

const onSave = (v, h) => {
  electronApi.blog.add({
    title: title.value,
    describe: text.value.slice(0, 100),
    filePath: 'test.md'
  });
  // console.log(v);

  // h.then((html) => {
  //   console.log(html);
  // });
};
</script>

<style lang="scss" scoped>
.markdown__title {
  margin-bottom: var(--spacing-small);
  font-size: 22px;

  &.markdown__title-input {
    :deep(.el-input__wrapper) {
      box-shadow: none;
      align-self: center;

      .el-input__inner {
        text-align: center;
        color: var(--text-color-primary) !important;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }

  &.markdown__title-label {
    font-weight: bold;
    letter-spacing: 2px;
    height: 32px;
    text-align: center;

    &:hover {
      .markdown__title-edit {
        display: block;
      }
    }

    &.markdown__title-label--empty {
      color: var(--text-color-placeholder);
    }
  }

  .markdown__title-text {
    position: relative;
  }

  .markdown__title-edit {
    display: none;
    position: absolute;
    right: -30px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

#md-editor {
  flex-grow: 1;
  width: 100%;
}
</style>
