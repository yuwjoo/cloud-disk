<template>
  <div class="directory-list">
    <!-- 全选按钮 start -->
    <el-checkbox
      class="directory-list__all-check"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <!-- 全选按钮 end -->

    <el-checkbox-group
      v-infinite-scroll="loadData"
      class="directory-list__check-group"
      v-model="checkedList"
      @change="handleCheckGroupChange"
    >
      <div
        class="directory-list__item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleClickItem(item)"
      >
        <div class="directory-list__item-top" @click.stop>
          <el-checkbox
            :class="['directory-list__item-top-checkbox', { 'is-show': item.checked }]"
            :value="item.fullPath"
            @change="(ev) => (item.checked = ev)"
          />
          <el-dropdown
            class="directory-list__item-top-dropdown"
            :teleported="false"
            @command="handleItemCommand($event, item)"
          >
            <template #default>
              <i-ep-more-filled class="directory-list__item-top-dropdown-more" />
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
        <img class="directory-list__item-cover" :src="item.cover" alt="" @dragstart.prevent />
        <div class="directory-list__item-name" :title="item.name">{{ item.name }}</div>
        <div class="directory-list__item-last-modified">{{ item.modifiedDate }}</div>
      </div>
    </el-checkbox-group>

    <!-- 空状态 start -->
    <el-empty v-if="list.length === 0" class="overview-list__empty" description="暂无数据" />
    <!-- 空状态 end -->
  </div>
</template>

<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus';

type Item = {
  fullPath: string; // 完整路径
  name: string; // 名称
  size: number; // 大小
  type: 'file' | 'folder'; // 类型
  cover: string; // 封面
  createDate: string; // 创建日期
  modifiedDate: string; // 修改日期
  checkd: boolean; // 是否选中
};

const checkAll = ref(false); // 是否全选
const isIndeterminate = ref(false); // 是否中间状态
const checkedList = ref<string[]>([]); // 选中数据列表
const list = ref<any[]>([]); // 列表数据
const page = reactive({
  current: 1,
  size: 100,
  total: 0
}); // 分页数据

/**
 * @description: 加载数据
 */
function loadData() {}

/**
 * @description: 重新加载数据
 */
function reloadData() {}

/**
 * @description: 处理全选改变
 * @param {CheckboxValueType} val 选中状态
 */
function handleCheckAllChange(val: CheckboxValueType) {
  checkedList.value = val ? fileList.value.map((item) => item.fullPath) : [];
  isIndeterminate.value = false;
}

/**
 * @description: 处理复选框组改变
 * @param {CheckboxValueType[]} value 选中状态列表
 */
function handleCheckGroupChange(value: CheckboxValueType[]) {
  const checkedCount = value.length;
  checkAll.value = checkedCount === fileList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < fileList.value.length;
}

/**
 * @description: 处理点击item
 * @param {any} item item
 */
function handleClickItem(item) {}

/**
 * @description: 处理item下拉框指令
 */
function handleItemCommand() {}
</script>

<style lang="scss">
.overview-all-check {
  margin-bottom: var(--spacing-medium);
}

.directory-list {
  height: 0;
  flex-grow: 1;

  .overview-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    height: 100%;
    overflow-y: auto;
    align-content: flex-start;

    &.overview-list--empty {
      position: relative;
      top: 20%;
      justify-content: center;

      .overview-list__empty {
        display: block;
      }
    }

    .overview-list__item {
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

        .overview-list__item-checkbox,
        .overview-list__dropdown {
          display: block;
        }
      }

      .overview-list__item-checkbox {
        position: absolute;
        top: var(--spacing-small);
        left: var(--spacing-small);
        display: none;

        &.is-show {
          display: block;
        }
      }

      .overview-list__dropdown {
        position: absolute;
        top: var(--spacing-small);
        right: var(--spacing-small);
        display: none;

        .overview-list__more {
          outline-style: none;
        }
      }

      .overview-list__cover {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }

      .overview-list__name {
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

      .overview-list__modified-date {
        margin-top: 2px;
        color: var(--text-color-secondary);
        font-size: var(--text-size-extra-small);
      }
    }

    .overview-list__empty {
      display: none;
    }
  }
}
</style>
