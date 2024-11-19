<!--
 * @FileName: 文件列表
 * @FilePath: \cloud-disk\src\renderer\components\fileList\FileList.vue
 * @Author: YH
 * @Date: 2024-09-25 10:29:13
 * @LastEditors: YH
 * @LastEditTime: 2024-11-19 11:06:17
 * @Description: 
-->
<template>
  <div class="file-list">
    <el-checkbox
      class="file-list__checked"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAll"
    >
      全选
    </el-checkbox>

    <el-checkbox-group
      v-if="fileList.length > 0"
      class="file-list__list"
      v-model="bindCheckedList"
      @change="handleChecked"
    >
      <div v-for="(item, index) in fileList" :key="index" class="file-list__item">
        <el-checkbox class="file-list__item-checkbox" :value="item" />

        <el-dropdown
          class="file-list__item-dropdown"
          :teleported="false"
          :show-timeout="0"
          @command="emit('operateItem', $event, item.raw)"
        >
          <template #default>
            <i-ep-more-filled class="file-list__item-more-icon" />
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="item.operate?.download" command="download">
                下载
              </el-dropdown-item>
              <el-dropdown-item v-if="item.operate?.rename" command="rename">
                重命名
              </el-dropdown-item>
              <el-dropdown-item v-if="item.operate?.delete" command="delete">
                <el-text type="danger">删除</el-text>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div class="file-list__item-content" @click="emit('clickItem', item.raw)">
          <img class="file-list__item-content-cover" :src="item.cover" alt="" @dragstart.prevent />
          <el-tooltip effect="dark" placement="bottom">
            <template #default>
              <div class="file-list__item-content-name">{{ item.name }}</div>
            </template>
            <template #content>
              <div>名称：{{ item.name }}</div>
              <div>大小：{{ getFileSize(item.size) }}</div>
              <div>最近修改：{{ dayjs(item.updatedTime).format('YYYY/MM/DD HH:mm:ss') }}</div>
            </template>
          </el-tooltip>
          <div class="file-list__item-content-describe">
            <template v-if="item.type === 'file'">
              {{ getFileSize(item.size) }}
            </template>
            <template v-else>
              {{ dayjs(item.updatedTime).format('YYYY/MM/DD HH:mm:ss') }}
            </template>
          </div>
        </div>
      </div>
    </el-checkbox-group>

    <el-empty v-else class="file-list__empty" description="暂无数据" />
  </div>
</template>

<script setup lang="ts" name="FileList" generic="ItemType extends Record<string, any>">
import dayjs from 'dayjs';
import { useCheckbox } from './hooks/checkbox';
import { getFileSize } from '@/utils/file';
import { useFileData, type FileItem } from './hooks/fileData';

export type FileItemCommand = 'download' | 'rename' | 'delete';

export type PropsType<ItemType> = {
  list: ItemType[]; // 列表数据
  parseItem: (item: ItemType) => FileItem; // 解析数据
};

export type EmitType<ItemType> = {
  operateItem: [command: FileItemCommand, item: ItemType]; // 触发数据项操作
  clickItem: [item: ItemType]; // 点击数据项
};

const { list, parseItem } = defineProps<PropsType<ItemType>>();

const emit = defineEmits<EmitType<ItemType>>();

const checkedList = defineModel<ItemType[]>('checkedList', { required: true }); // 选中数据
const bindCheckedList = checkedList as any[];
const { checkAll, isIndeterminate, handleCheckAll, handleChecked } = useCheckbox<ItemType>(
  checkedList,
  () => list
);

const { fileList } = useFileData<ItemType>(() => list, parseItem);
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .file-list__checked {
    align-self: flex-start;
  }

  .file-list__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    overflow-y: auto;
    align-content: flex-start;
    height: 0;
    flex-grow: 1;

    .file-list__item {
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

        .file-list__item-checkbox,
        .file-list__item-dropdown {
          display: block;
        }
      }

      .file-list__item-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        padding: var(--spacing-small);
        display: none;

        &.is-checked {
          display: block;
        }
      }

      .file-list__item-dropdown {
        position: absolute;
        top: 0;
        right: 0;
        display: none;

        .file-list__item-more-icon {
          padding: var(--spacing-small);
          outline-style: none;
        }
      }

      .file-list__item-content {
        .file-list__item-content-cover {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .file-list__item-content-name {
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

        .file-list__item-content-describe {
          margin-top: 2px;
          color: var(--text-color-secondary);
          font-size: var(--text-size-extra-small);
        }
      }
    }
  }

  .file-list__empty {
    margin: var(--spacing-large) auto 0;
  }
}
</style>
