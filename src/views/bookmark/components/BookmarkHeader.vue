<template>
  <div class="bookmark-header">
    <span class="bookmark-header__title">书签管理</span>
    <el-button type="primary" link class="bookmark-header__add-btn" @click="handleManageGroups">
      <el-icon><Setting /></el-icon>
      管理分组
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue';

const emit = defineEmits(['manage-groups']);

const handleManageGroups = () => {
  emit('manage-groups');
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

  &__add-btn {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>