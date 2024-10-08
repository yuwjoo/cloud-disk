<!--
 * @FileName: 文件项
 * @FilePath: \cloud-disk\src\views\storage\components\FileItemComp.vue
 * @Author: YH
 * @Date: 2024-09-04 17:05:10
 * @LastEditors: YH
 * @LastEditTime: 2024-10-08 16:21:16
 * @Description: 
-->
<template>
  <div class="file-item" @click="$emit('open', item)">
    <el-checkbox class="file-item__checkbox" :value="item.path" @click.stop />
    <el-dropdown
      class="file-item__dropdown"
      :teleported="false"
      :show-timeout="0"
      @command="handleCommand"
    >
      <template #default>
        <i-ep-more-filled class="file-item__dropdown-more" />
      </template>
      <template #dropdown>
        <el-dropdown-menu @click.stop>
          <el-dropdown-item v-if="item.type === 'file'" command="download">下载</el-dropdown-item>
          <el-dropdown-item v-if="item.writable" command="rename">重命名</el-dropdown-item>
          <el-dropdown-item v-if="item.writable" command="delete">
            <el-text type="danger">删除</el-text>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <img class="file-item__cover" :src="cover" alt="" @dragstart.prevent />
    <el-tooltip effect="dark" placement="bottom">
      <template #default>
        <div class="file-item__name">{{ item.name }}</div>
      </template>
      <template #content>
        <div>名称：{{ item.name }}</div>
        <div>大小：{{ size }}</div>
        <div>最近修改：{{ updatedData }}</div>
      </template>
    </el-tooltip>
    <div class="file-item__describe">
      {{ item.type === 'file' ? size : updatedData }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteFile, downloadFile, renameFile } from '@/api/storage';
import type { FileInfo } from '@/api/types/storage';
import { getFileCover, getFileSize } from '@/utils/file';
import { dayjs } from 'element-plus';

const emits = defineEmits<{
  open: [item: FileInfo]; // 打开
  change: []; // 改变
}>();
const props = defineProps({
  item: {
    type: Object as PropType<FileInfo>,
    required: true
  } // 数据项
});
const cover = computed(() => getFileCover(props.item.path, props.item.type)); // 封面
const size = computed(() => getFileSize(props.item.size)); // 大小
const updatedData = computed(() => dayjs(props.item.updatedTime).format('YYYY/MM/DD HH:mm:ss')); // 修改日期

/**
 * @description: 处理下拉框指令
 * @param {string} command 指令
 */
function handleCommand(command: string) {
  switch (command) {
    case 'download':
      handleDownload();
      break;
    case 'rename':
      handleRename();
      break;
    case 'delete':
      handleDelete();
      break;
  }
}

/**
 * @description: 处理下载
 */
function handleDownload() {
  downloadFile({ path: props.item.path }).then((res) => {
    const a = document.createElement('a');
    a.href = res.data;
    a.download = 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

/**
 * @description: 处理重命名
 */
function handleRename() {
  ElMessageBox.prompt(`将“${props.item.name}”修改为：`, '重命名', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[^"*<>?\\|/:]+$/,
    inputErrorMessage: '名称不合法',
    beforeClose: async (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      try {
        await renameFile({
          parent: props.item.parent,
          oldName: props.item.name,
          newName: ctx.inputValue
        });
        ElMessage({
          type: 'success',
          message: '修改成功'
        });
        close();
        emits('change');
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
}

/**
 * @description: 处理删除
 */
function handleDelete() {
  ElMessageBox.confirm(`即将删除“${props.item.name}”，是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: async (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      try {
        await deleteFile({
          path: props.item.path
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        });
        close();
        emits('change');
      } catch (err) {
        /* empty */
      }
      ctx.confirmButtonLoading = false;
    }
  }).catch(() => {});
}
</script>

<style lang="scss" scoped>
.file-item {
  position: relative;
  cursor: pointer;
  text-align: center;
  line-height: var(--text-line-height-base);
  padding: var(--spacing-medium) var(--spacing-small);
  border-radius: var(--border-radius-base);
  width: 140px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--fill-color);

    .file-item__checkbox,
    .file-item__dropdown {
      display: block;
    }
  }

  .file-item__checkbox {
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--spacing-small);
    display: none;

    &.is-checked {
      display: block;
    }
  }

  .file-item__dropdown {
    position: absolute;
    top: 0;
    right: 0;
    display: none;

    .file-item__dropdown-more {
      padding: var(--spacing-small);
      outline-style: none;
    }
  }

  .file-item__cover {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .file-item__name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: var(--text-size-small);
    word-wrap: break-word;

    &:hover {
      color: var(--color-primary);
    }
  }

  .file-item__describe {
    margin-top: 2px;
    color: var(--text-color-secondary);
    font-size: var(--text-size-extra-small);
  }
}
</style>
