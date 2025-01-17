<template>
  <div class="home">
    <div class="home__top">
      <ElButton type="primary" :icon="Plus" @click="handleAdd">开始创建</ElButton>
    </div>
    <div class="home__list">
      <ElCard v-for="item in list" :key="item.id" class="home__list-item home__card" shadow="hover">
        <a class="home__card-header" href="/markdown" target="_blank">
          <ElIcon class="home__card-enter"><Right /></ElIcon>
          <div class="home__card-title">{{ item.title }}</div>
        </a>
        <div class="home__card-describe">{{ item.describe }}</div>
        <div class="home__card-footer">
          <ElText type="primary">编辑文档</ElText>
          <ElText type="danger">删除文档</ElText>
        </div>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeView">
import { useAddListener, useElectronApi } from '@/hooks/electron';
import { Plus, Right } from '@element-plus/icons-vue';
import type { BlogData } from 'common/types/blog';

const electronApi = useElectronApi();
const list = ref<BlogData[]>([]);

const setList = async () => {
  try {
    list.value = await electronApi.blog.list();
  } catch {
    ElMessage.error('获取列表失败');
  }
};

const handleAdd = () => {
  window.open('/markdown', '_blank');
};

setList();

useAddListener('blog-broadcast', (_, data) => {
  console.log('blog-broadcast', data);
  data.forEach(({ operate, data }) => {
    if (operate === 'add') {
      list.value.push(data);
    } else if (operate === 'delete') {
      list.value = list.value.filter((item) => item.id !== data.id);
    } else if (operate === 'update') {
      list.value = list.value.map((item) => (item.id === data.id ? data : item));
    }
  });
});
</script>

<style lang="scss" scoped>
.home__top {
  margin-bottom: 16px;
}

.home__list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .home__list-item {
    box-sizing: border-box;
    width: calc((100% - 16px * 2) / 3);
    height: 120px;

    @media (min-width: 1500px) {
      & {
        width: calc((100% - 16px * 4) / 4);
      }
    }
  }
}

.home__card {
  &:hover {
    .home__card-enter {
      display: block;
    }

    .home__card-footer {
      display: flex;
    }
  }

  .home__card-header {
    cursor: pointer;
    position: relative;
    color: inherit;
    text-decoration: none;

    &:hover {
      opacity: 0.8;

      .home__card-title {
        text-decoration: underline;
      }
    }
  }

  .home__card-enter {
    display: none;
    position: absolute;
    right: 0;
  }

  .home__card-title {
    font-size: 18px;
    font-weight: bold;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }

  .home__card-describe {
    color: var(--text-color-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: var(--spacing-medium);
    height: 28px;
  }

  .home__card-footer {
    display: none;
    margin-top: var(--spacing-small);
    gap: var(--spacing-medium);

    .el-text {
      cursor: pointer;
    }
  }
}
</style>
