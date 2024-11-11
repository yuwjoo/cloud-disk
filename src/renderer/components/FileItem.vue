<!--
 * @FileName: 文件项
 * @FilePath: \cloud-disk\src\renderer\components\FileItem.vue
 * @Author: YH
 * @Date: 2024-09-04 17:05:10
 * @LastEditors: YH
 * @LastEditTime: 2024-11-11 15:47:17
 * @Description: 
-->
<template>
  <div class="file-item" @click="handleClickFile()">
    <el-checkbox class="file-item__checkbox" :value="item.path" @click.stop />

    <el-dropdown
      class="file-item__dropdown"
      :teleported="false"
      :show-timeout="0"
      @command="emit($event)"
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

<script setup lang="ts" name="FileItem">
import { getFileCover, getFileSize } from '@/utils/file';
import { dayjs } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import type { FileInfo } from '@/types/file';

const emit = defineEmits<{
  download: []; // 下载
  rename: []; // 重命名
  delete: []; // 删除
  preview: []; // 浏览
}>();

const props = defineProps({
  item: {
    type: Object as PropType<FileInfo>,
    required: true
  } // 数据项
});

const route = useRoute();

const router = useRouter();

const cover = computed(() => getFileCover(props.item.path, props.item.type)); // 封面

const size = computed(() => getFileSize(props.item.size)); // 大小

const updatedData = computed(() => dayjs(props.item.updatedTime).format('YYYY/MM/DD HH:mm:ss')); // 修改日期

/**
 * @description: 处理点击文件
 */
const handleClickFile = () => {
  if (props.item.type === 'directory') {
    // 进入文件夹
    router.push({
      name: route.name,
      query: {
        path: props.item.path
      }
    });
  } else {
    // 浏览文件
    emit('preview');
  }
};
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
    line-clamp: 2;
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
