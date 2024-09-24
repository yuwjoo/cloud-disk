<!--
 * @FileName: 存储页面-面包屑
 * @FilePath: \cloud-disk\src\views\storage\components\BreadcrumbComp.vue
 * @Author: YH
 * @Date: 2024-09-24 11:42:29
 * @LastEditors: YH
 * @LastEditTime: 2024-09-24 17:57:08
 * @Description: 
-->
<template>
  <div class="breadcrumb">
    <template v-if="nameList.length > 1">
      <el-icon class="breadcrumb__back" @click="handleRoute(-1)">
        <i-ep-back />
      </el-icon>
      <el-divider direction="vertical" />
    </template>
    <el-breadcrumb class="breadcrumb__breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(name, index) in nameList"
        :key="index"
        @click="handleRoute(index)"
      >
        {{ name || '全部文件' }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const parent = defineModel('parent', { type: String, required: true }); // 父级路径
const rootPath = computed(() => useUserStore().user.storageOrigin); // 用户根路径
const nameList = computed(() => {
  let relativePath = parent.value.slice(rootPath.value.length);
  if (!relativePath.startsWith('/')) relativePath += '/';
  return relativePath.split('/');
}); // 路径名称列表

/**
 * @description: 处理导航
 * @param {number} index 路径下标
 */
function handleRoute(index: number) {
  parent.value = rootPath + nameList.value.slice(1, index).join('/');
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;

  .breadcrumb__back {
    font-size: 18px;
    cursor: pointer;
    margin-right: var(--spacing-small);

    &:hover {
      color: var(--color-primary);
    }
  }

  .breadcrumb__breadcrumb {
    font-weight: bold;

    :deep(.el-breadcrumb__item):not(:last-child) {
      cursor: pointer;

      .el-breadcrumb__inner:hover {
        color: var(--color-primary);
      }
    }
  }
}
</style>
