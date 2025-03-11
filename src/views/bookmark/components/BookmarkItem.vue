<template>
  <el-card class="bookmark-item" shadow="hover">
    <div class="bookmark-item__content" @click="openBookmark(bookmark.url)">
      <img :src="getFavicon(bookmark.url)" class="bookmark-item__favicon" alt="favicon" />
      <div class="bookmark-item__info">
        <h3 class="bookmark-item__title">{{ bookmark.title }}</h3>
        <p class="bookmark-item__url">{{ bookmark.url }}</p>
      </div>
    </div>
    <div class="bookmark-item__actions">
      <el-dropdown trigger="click" @click.stop @command="handleCommand">
        <el-button type="primary" link>
          <el-icon><MoreFilled /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-dropdown-item>
            <el-dropdown-item command="delete">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Edit, Delete, MoreFilled } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { Bookmark } from '../data';

interface Props {
  bookmark: Bookmark;
}

const props = defineProps<Props>();
const emit = defineEmits(['edit', 'delete']);

// 获取网站图标
const getFavicon = (url: string) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
  } catch (e) {
    return "";
  }
};

// 打开书签
const openBookmark = (url: string) => {
  window.open(url, "_blank");
};

// 处理下拉菜单命令
const handleCommand = (command: string) => {
  switch (command) {
    case 'edit':
      emit('edit', props.bookmark);
      break;
    case 'delete':
      ElMessageBox.confirm('确定要删除该书签吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emit('delete', props.bookmark);
        ElMessage.success('删除成功');
      });
      break;
  }
};
</script>

<style lang="scss" scoped>
.bookmark-item {
  height: 100%;
  cursor: pointer;
  position: relative;

  &__content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
  }

  &__favicon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &__info {
    flex: 1;
    overflow: hidden;
  }

  &__title {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__url {
    margin: 4px 0 0;
    font-size: 12px;
    color: #909399;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: none;
  }

  &:hover {
    .bookmark-item__actions {
      display: block;
    }
  }

  :deep(.el-dropdown-menu__item) {
    .el-icon {
      margin-right: 8px;
    }
  }
}
</style>