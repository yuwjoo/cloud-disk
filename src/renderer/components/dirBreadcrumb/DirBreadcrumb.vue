<!--
 * @FileName: 目录导航面包屑
 * @FilePath: \cloud-disk\src\renderer\components\dirBreadcrumb\DirBreadcrumb.vue
 * @Author: YH
 * @Date: 2024-11-11 14:03:50
 * @LastEditors: YH
 * @LastEditTime: 2024-11-26 17:56:50
 * @Description: 
-->
<template>
  <div class="dir-breadcrumb">
    <template v-if="hasBack">
      <el-icon class="dir-breadcrumb__back" @click="handleBack()">
        <i-ep-back />
      </el-icon>
      <el-divider direction="vertical" />
    </template>
    <el-breadcrumb class="dir-breadcrumb__breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in itemList" :key="index" :to="item.to">
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="DirBreadcrumb">
import { useRoute, useRouter } from 'vue-router';

export type PropsType = {
  path: string; // 当前路径
};

export interface ItemList {
  label: string; // 名称
  to: Record<string, any>; // 跳转路径
}

const { path = '/' } = defineProps<PropsType>();

const router = useRouter();
const route = useRoute();

const itemList = ref<ItemList[]>([]); // item列表

const hasBack = computed<boolean>(() => itemList.value.length > 1); // 显示返回上一层

/**
 * @description: 处理后退
 */
const handleBack = () => {
  router.replace(itemList.value[itemList.value.length - 2]['to']);
};

watchEffect(() => {
  const names = path !== '/' ? path.split('/') : [''];
  itemList.value = names.map((name, index) => ({
    label: index === 0 ? '全部文件' : name || '未知',
    to: {
      name: route.name,
      query: {
        path: names.slice(0, index + 1).join('/') || '/'
      }
    }
  }));
});
</script>

<style lang="scss" scoped>
.dir-breadcrumb {
  display: flex;
  align-items: center;

  .dir-breadcrumb__back {
    font-size: 18px;
    cursor: pointer;
    margin-right: var(--spacing-small);

    &:hover {
      color: var(--color-primary);
    }
  }

  .dir-breadcrumb__breadcrumb {
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
