<!--
 * @FileName: 导航面包屑
 * @FilePath: \cloud-disk\src\views\storage\components\BreadcrumbComp.vue
 * @Author: YH
 * @Date: 2024-09-24 11:42:29
 * @LastEditors: YH
 * @LastEditTime: 2024-10-08 17:31:59
 * @Description: 
-->
<template>
  <div class="breadcrumb">
    <template v-if="nameList.length > 1">
      <el-icon class="breadcrumb__back" @click="handleBack()">
        <i-ep-back />
      </el-icon>
      <el-divider direction="vertical" />
    </template>
    <el-breadcrumb class="breadcrumb__breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(name, index) in nameList"
        :key="index"
        :to="{ name: $route.name as string, query: { path: getPath(index + 1) } }"
      >
        {{ name || '全部文件' }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '@/hooks/vue-router';
import { useUserStore } from '@/store/user';
import { useRoute } from 'vue-router';

const route = useRoute();
const parent = defineModel<string>('parent', { required: true }); // 父级路径
const rootPath = computed(() => useUserStore().user.storageOrigin); // 用户根路径
const nameList = computed(() => {
  const path = parent.value.slice(rootPath.value.length - 1);
  return path === '/' ? [''] : path.split('/');
}); // 路径名称列表

/**
 * @description: 处理后退
 */
function handleBack() {
  useRouter().push({
    name: route.name as string,
    query: {
      path: getPath(-1)
    }
  });
}

/**
 * @description: 获取访问路径
 * @param {number} pos 位置
 */
function getPath(pos: number) {
  return rootPath.value + nameList.value.slice(0, pos).filter(Boolean).join('/');
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
