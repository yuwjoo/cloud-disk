<!--
 * @FileName: 页面-任务抽屉
 * @FilePath: \cloud-disk\src\layouts\control\components\LayoutTaskDrawer.vue
 * @Author: YH
 * @Date: 2024-07-12 15:00:58
 * @LastEditors: YH
 * @LastEditTime: 2024-09-02 17:52:09
 * @Description: 
-->

<template>
  <el-drawer v-model="visible" direction="rtl" size="400px" :with-header="false">
    <!-- 头部 start -->
    <div class="layout-task-drawer__header">
      <span class="layout-task-drawer__header-title">传输列表</span>
      <el-icon class="layout-task-drawer__header-close" @click="close()"><i-ep-close /></el-icon>
    </div>
    <!-- 头部 end -->

    <!-- 切换按钮 start -->
    <el-segmented
      v-model="active"
      class="layout-task-drawer__segmented"
      :options="segmentedOptions"
    >
      <template #default="{ item }">
        <div class="layout-task-drawer__segmented-item">
          <el-icon><component :is="item.icon" /></el-icon>
          <div>{{ item.label }}</div>
        </div>
      </template>
    </el-segmented>
    <!-- 切换按钮 end -->

    <!-- 任务列表 start -->
    <div v-for="(item, index) in list" :key="index" class="layout-task-drawer__task">
      <img
        class="layout-task-drawer__task-icon"
        src="@/assets/images/fileSystem/small/compressedFile.png"
        alt=""
        @dragstart.prevent
      />
      <div class="layout-task-drawer__task-content">
        <div class="layout-task-drawer__task-filename">{{ item.file.name }}</div>
        <el-progress
          class="layout-task-drawer__task-progress"
          :percentage="item.progress"
          :stroke-width="4"
        />
        <div class="layout-task-drawer__task-size">{{ item.file.size }}</div>
      </div>
      <div class="layout-task-drawer__task-operate">
        {{ item.status }}
        <el-button
          v-if="item.status === 'uploading'"
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
        <el-button type="danger" :icon="IEpDelete" circle size="small" />
      </div>
    </div>
    <!-- 任务列表 end -->

    <!-- 空状态 start -->
    <el-empty v-if="list.length === 0" class="overview__empty" description="暂无数据" />
    <!-- 空状态 end -->
  </el-drawer>
</template>

<script setup lang="ts">
import IEpUpload from '~icons/ep/upload';
import IEpDownload from '~icons/ep/download';
import IEpDelete from '~icons/ep/delete';
import IEpPause from '~icons/icons/pause';
import ICaretRight from '~icons/ep/caretRight';
import { useTaskDrawerStore } from '@/store/taskDrawer';
import { uploadTaskList } from '@/utils/uploadManager';
import { storeToRefs } from 'pinia';

const { visible } = storeToRefs(useTaskDrawerStore());
const { close } = useTaskDrawerStore();
const active = ref<string>('upload');
const segmentedOptions = [
  { label: '上传中', value: 'upload', icon: IEpUpload },
  { label: '下载中', value: 'download', icon: IEpDownload }
];
const list = computed(() =>
  active.value === 'upload' ? uploadTaskList.value : uploadTaskList.value
);
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
    flex: 1;

    .layout-task-drawer__task-size {
      font-size: var(--text-size-extra-small);
      color: var(--text-color-secondary);
    }
  }
}
</style>
