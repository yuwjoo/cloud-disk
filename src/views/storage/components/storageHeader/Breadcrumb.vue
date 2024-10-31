<!--
 * @FileName: 存储页-头部-导航面包屑
 * @FilePath: \cloud-disk\src\views\storage\components\storageHeader\Breadcrumb.vue
 * @Author: YH
 * @Date: 2024-09-24 11:42:29
 * @LastEditors: YH
 * @LastEditTime: 2024-10-31 11:36:29
 * @Description: 
-->
<template>
  <div class="breadcrumb">
    <template v-if="dirList.length > 1">
      <el-icon class="breadcrumb__back" @click="handleBack()">
        <i-ep-back />
      </el-icon>
      <el-divider direction="vertical" />
    </template>
    <el-breadcrumb class="breadcrumb__breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(dir, index) in dirList"
        :key="index"
        :to="{ name: route.name as string, query: { path: getPath(index + 1) } }"
      >
        {{ dir || '全部文件' }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  path: {
    type: String,
    required: true
  } // 目录路径
});

const route = useRoute();

const router = useRouter();

const userStore = useUserStore();

const rootPath = computed(() => userStore.user?.storageOrigin || ''); // 用户根路径

const dirList = computed(() => {
  const path = props.path.slice(rootPath.value.length - 1);
  return path === '/' ? [''] : path.split('/');
}); // 目录列表

/**
 * @description: 处理后退
 */
const handleBack = () => {
  router.push({ name: route.name as string, query: { path: getPath(-1) } });
};

/**
 * @description: 获取访问路径
 * @param {number} pos 位置
 */
const getPath = (pos: number) => {
  return rootPath.value + dirList.value.slice(0, pos).filter(Boolean).join('/');
};
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
