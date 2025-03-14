<template>
  <div class="bookmark-header">
    <span class="bookmark-header__title">书签管理</span>
    <div class="bookmark-header__actions">
      <el-button type="primary" link class="bookmark-header__sync-btn" @click="handleSyncFavicons" :icon="Refresh">
        同步图标
      </el-button>
      <el-button type="primary" link class="bookmark-header__add-btn" @click="handleManageGroups" :icon="Setting">
        管理分组
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting, Refresh } from '@element-plus/icons-vue';

const emit = defineEmits(['manage-groups', 'sync-favicons']);

const handleManageGroups = () => {
  emit('manage-groups');
};

const handleSyncFavicons = () => {
  emit('sync-favicons');
};
</script>

<style lang="scss" scoped>
.bookmark-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__actions {
    display: flex;
    gap: 12px;
  }

  &__sync-btn,
  &__add-btn {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>