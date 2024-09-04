<!--
 * @FileName: 目录项
 * @FilePath: \cloud-disk\src\views\overview\components\directoryItem.vue
 * @Author: YH
 * @Date: 2024-09-04 17:05:10
 * @LastEditors: YH
 * @LastEditTime: 2024-09-04 18:01:56
 * @Description: 
-->
<template>
  <div class="directory-item" @click="$emit('open')">
    <div class="directory-item__top" @click.stop>
      <el-checkbox
        :class="['directory-item__top-checkbox', { 'is-visible': checked }]"
        :value="item.fullPath"
        @change="checked = !!$event"
      />
      <el-dropdown
        class="directory-item__top-dropdown"
        :teleported="false"
        @command="handleCommand"
      >
        <template #default>
          <i-ep-more-filled class="directory-item__top-dropdown-more" />
        </template>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="item.type === 'file'" command="download">
              下载
            </el-dropdown-item>
            <el-dropdown-item command="rename">重命名</el-dropdown-item>
            <el-dropdown-item command="delete">
              <el-text type="danger">删除</el-text>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <img class="directory-item__cover" :src="item.cover" alt="" @dragstart.prevent />
    <div class="directory-item__name" :title="item.name">{{ item.name }}</div>
    <div class="directory-item__last-modified">{{ item.modifiedDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { downloadFile, deleteFiles, rename } from '@/api/overview';

type Item = {
  fullPath: string; // 完整路径
  name: string; // 名称
  size: number; // 大小
  type: 'file' | 'folder'; // 类型
  cover: string; // 封面
  createDate: string; // 创建日期
  modifiedDate: string; // 修改日期
};

type Emits = {
  open: [];
  delete: [];
  change: [item: Item];
};

const emits = defineEmits<Emits>();
const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  } // 数据项
});
const checked = ref<boolean>(false); // 是否选中

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
  downloadFile({ filePath: props.item.fullPath }).then((res) => {
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
  ElMessageBox.prompt(`将“${props.item.name}”更换为：`, '重命名', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[^"*<>?\\|/:]+$/,
    inputErrorMessage: '名称不合法',
    beforeClose: (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      rename({ filePath: props.item.fullPath, newName: ctx.inputValue })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '重命名成功'
          });
          emits('change', { ...props.item, name: ctx.inputValue });
          close();
        })
        .finally(() => {
          ctx.confirmButtonLoading = false;
        });
    }
  });
}

/**
 * @description: 处理删除
 */
function handleDelete() {
  ElMessageBox.confirm(`即将删除“${props.item.name}”，是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteFiles({ filePaths: [props.item.fullPath] }).then(() => {
        ElMessage({ type: 'success', message: '删除成功' });
        emits('delete');
      });
    })
    .catch(() => {});
}
</script>

<style lang="scss">
.directory-item {
  position: relative;
  cursor: pointer;
  text-align: center;
  line-height: var(--text-line-height-base);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius-base);
  width: 140px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--fill-color);

    .directory-item__top {
      .directory-item__top-checkbox,
      .directory-item__top-dropdown {
        display: block;
      }
    }
  }

  .directory-item__top {
    position: absolute;
    top: var(--spacing-small);
    right: var(--spacing-small);
    left: var(--spacing-small);
    display: flex;
    justify-content: space-between;

    .directory-item__top-checkbox {
      display: none;

      &.is-visible {
        display: block;
      }
    }

    .directory-item__top-dropdown {
      display: none;

      .directory-item__top-dropdown-more {
        outline-style: none;
      }
    }
  }

  .directory-item__cover {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .directory-item__name {
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

  .directory-item__last-modified {
    margin-top: 2px;
    color: var(--text-color-secondary);
    font-size: var(--text-size-extra-small);
  }
}
</style>
