<!--
 * @FileName: 页面-任务抽屉
 * @FilePath: \cloud-disk\src\layouts\control\components\LayoutTaskDrawer.vue
 * @Author: YH
 * @Date: 2024-07-12 15:00:58
 * @LastEditors: YH
 * @LastEditTime: 2024-09-03 17:52:48
 * @Description: 
-->

<template>
  <el-drawer v-model="visible" direction="rtl" size="400px" :with-header="false">
    <!-- 头部 start -->
    <div class="layout-task-drawer__header">
      <span class="layout-task-drawer__header-title">上传列表</span>
      <el-icon class="layout-task-drawer__header-close" @click="visible = false"
        ><i-ep-close
      /></el-icon>
    </div>
    <!-- 头部 end -->

    <!-- 任务列表 start -->
    <div
      v-for="(item, index) in uploadTaskList"
      :key="(item.file as any).hash || index"
      class="layout-task-drawer__task"
    >
      <img
        class="layout-task-drawer__task-icon"
        src="@/assets/images/fileSystem/small/compressedFile.png"
        alt=""
        @dragstart.prevent
      />
      <div class="layout-task-drawer__task-content">
        <div class="layout-task-drawer__task-filename" :title="item.file.name">
          {{ item.file.name }}
        </div>
        <el-progress
          class="layout-task-drawer__task-progress"
          :percentage="Math.floor(item.progress * 100) / 100"
          :stroke-width="4"
        />
        <div class="layout-task-drawer__task-size">{{ getFileSize(item.file.size) }}</div>
      </div>
      <div class="layout-task-drawer__task-operate">
        <el-button
          v-if="item.status === 'waiting' || item.status === 'uploading'"
          type="primary"
          :icon="IEpPause"
          circle
          size="small"
          @click="item.pause()"
        />
        <el-button
          v-else-if="item.status === 'pausing'"
          type="primary"
          :icon="ICaretRight"
          circle
          size="small"
          @click="item.start()"
        />
        <el-button
          type="danger"
          :icon="IEpDelete"
          circle
          size="small"
          @click="handleDelete(item)"
        />
      </div>
    </div>
    <!-- 任务列表 end -->

    <!-- 空状态 start -->
    <el-empty v-if="uploadTaskList.length === 0" class="overview__empty" description="暂无数据" />
    <!-- 空状态 end -->
  </el-drawer>
</template>

<script setup lang="ts" name="TaskDrawer">
import IEpDelete from '~icons/ep/delete';
import IEpPause from '~icons/icons/pause';
import ICaretRight from '~icons/ep/caretRight';
import { visible } from '@/utils/uploadManager';
import { uploadTaskList } from '@/utils/uploadManager';

/**
 * @description: 获取文件大小
 * @param {number} size 大小（字节）
 * @return {string} 大小字符
 */
function getFileSize(size: number): string {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
  }
}

/**
 * @description: 处理删除
 * @param {(typeof uploadTaskList.value)[0]} item 任务
 */
function handleDelete(item: (typeof uploadTaskList.value)[0]) {
  item.pause();
  uploadTaskList.value = uploadTaskList.value.filter((task) => task !== item);
}
</script>

<style lang="scss" scoped>
.layout-task-drawer__header {
  display: flex;
  justify-content: space-between;

  .layout-task-drawer__header-close {
    cursor: pointer;
    font-size: 18px;
  }
}
.layout-task-drawer__segmented {
  --el-border-radius-base: var(--border-radius-round);
  margin: var(--spacing-large) 0 var(--spacing-medium);

  .layout-task-drawer__segmented-item {
    display: flex;
    align-items: center;
    line-height: 1;
    gap: 0 var(--spacing-small);
    user-select: none;
  }
}

.layout-task-drawer__task {
  display: flex;
  align-items: center;
  padding: var(--spacing-medium) 0;
  border-bottom: var(--border-width) var(--border-style) var(--border-color-light);

  .layout-task-drawer__task-icon {
    width: 40px;
    height: 40px;
    margin-right: var(--spacing-medium);
  }
  .layout-task-drawer__task-content {
    flex-grow: 1;
    width: 0;

    .layout-task-drawer__task-filename {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: var(--spacing-small);
    }

    .layout-task-drawer__task-size {
      font-size: var(--text-size-extra-small);
      color: var(--text-color-secondary);
    }
  }
}
</style>
