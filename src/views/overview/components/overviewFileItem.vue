<!--
 * @FileName: 页面-总览-文件项
 * @FilePath: \cloud-disk\src\views\overview\components\overviewFileItem.vue
 * @Author: YH
 * @Date: 2024-09-04 17:05:10
 * @LastEditors: YH
 * @LastEditTime: 2024-09-04 23:44:54
 * @Description: 
-->
<template>
  <div class="overview-file-item" @click="$emit('enter')">
    <!-- 顶部操作按钮 start -->
    <el-checkbox class="overview-file-item__checkbox" :value="item.fullPath" @click.stop />
    <el-dropdown
      class="overview-file-item__dropdown"
      :teleported="false"
      :show-timeout="0"
      @command="handleCommand"
    >
      <template #default>
        <i-ep-more-filled class="overview-file-item__dropdown-more" />
      </template>
      <template #dropdown>
        <el-dropdown-menu @click.stop>
          <el-dropdown-item v-if="item.type === 'file'" command="download">下载</el-dropdown-item>
          <el-dropdown-item command="rename">重命名</el-dropdown-item>
          <el-dropdown-item command="delete">
            <el-text type="danger">删除</el-text>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 顶部操作按钮 end -->

    <div class="overview-file-item__progress-mask" @mouseover.stop>
      <el-progress type="circle" :percentage="25" :stroke-width="8" :width="100" />
    </div>

    <!-- 文件信息 start -->
    <img class="overview-file-item__cover" :src="cover" alt="" @dragstart.prevent />
    <el-tooltip effect="dark" placement="bottom">
      <template #default>
        <div class="overview-file-item__name">{{ item.name }}</div>
      </template>
      <template #content>
        <div>名称：{{ item.name }}</div>
        <div>大小：{{ size }}</div>
        <div>最近修改：{{ item.modifiedDate }}</div>
      </template>
    </el-tooltip>
    <div class="overview-file-item__describe">
      {{ item.type === 'file' ? size : item.modifiedDate }}
    </div>
    <!-- 文件信息 end -->
  </div>
</template>

<script setup lang="ts">
import { downloadFile, deleteFiles, rename } from '@/api/overview';
import { getCover, getSizeStr } from '@/utils/handleFile';

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
  enter: []; // 点击进入
  delete: []; // 删除
  change: [item: Item]; // 改变
};

const emits = defineEmits<Emits>();
const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  } // 数据项
});
const cover = computed(() => getCover(props.item.cover)); // 封面
const size = computed(() => getSizeStr(props.item.size)); // 大小

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
  ElMessageBox.prompt(`将“${props.item.name}”修改为：`, '重命名', {
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
            message: '修改成功'
          });
          emits('change', { ...props.item, name: ctx.inputValue });
          close();
        })
        .finally(() => {
          ctx.confirmButtonLoading = false;
        });
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
    beforeClose(action, ctx, close) {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      deleteFiles({ filePaths: [props.item.fullPath] })
        .then(() => {
          ElMessage({ type: 'success', message: '删除成功' });
          emits('delete');
          close();
        })
        .finally(() => {
          ctx.confirmButtonLoading = false;
        });
    }
  }).catch(() => {});
}
</script>

<style lang="scss" scoped>
.overview-file-item {
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

    .overview-file-item__checkbox,
    .overview-file-item__dropdown {
      display: block;
    }
  }

  .overview-file-item__checkbox {
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--spacing-small);
    display: none;

    &.is-checked {
      display: block;
    }
  }

  .overview-file-item__dropdown {
    position: absolute;
    top: 0;
    right: 0;
    display: none;

    .overview-file-item__dropdown-more {
      padding: var(--spacing-small);
      outline-style: none;
    }
  }

  .overview-file-item__progress-mask {
    --el-text-color-regular: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba($color: black, $alpha: 0.5);
    border-radius: var(--border-radius-base);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overview-file-item__cover {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .overview-file-item__name {
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

  .overview-file-item__describe {
    margin-top: 2px;
    color: var(--text-color-secondary);
    font-size: var(--text-size-extra-small);
  }
}
</style>
