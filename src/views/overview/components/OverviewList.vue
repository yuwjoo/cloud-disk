<!--
 * @FileName: 页面-总览-文件列表
 * @FilePath: \cloud-disk\src\views\overview\components\OverviewList.vue
 * @Author: YH
 * @Date: 2024-07-12 13:33:23
 * @LastEditors: YH
 * @LastEditTime: 2024-07-15 11:22:40
 * @Description: 
-->
<template>
  <div class="overview-file-list">
    <div class="overview-file-list__item" v-for="(item, index) in list" :key="index">
      <el-icon class="overview-file-list__item-download"><i-ep-download /></el-icon>
      <img
        class="overview-file-list__item-cover"
        src="@/assets/images/fileSystem/small/compressedFile.png"
        alt=""
        @dragstart.prevent
      />
      <div class="overview-file-list__item-name">{{ item.name }}</div>
      <div class="overview-file-list__item-date">{{ item.modifiedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { overviewListProps } from '../types/OverviewList';

defineProps(overviewListProps);
</script>

<style lang="scss" scoped>
.overview-file-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-small);

  .overview-file-list__item {
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

      .overview-file-list__item-download {
        display: block;
      }
    }

    .overview-file-list__item-download {
      position: absolute;
      top: 0;
      right: 0;
      padding: var(--spacing-small);
      color: var(--color-primary);
      display: none;
      font-size: 18px;
    }

    .overview-file-list__item-cover {
      width: 60px;
      height: 60px;
    }

    .overview-file-list__item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: var(--text-size-small);

      &:hover {
        color: var(--color-primary);
      }
    }

    .overview-file-list__item-date {
      margin-top: 2px;
      color: var(--text-color-secondary);
      font-size: var(--text-size-extra-small);
    }
  }
}
</style>
