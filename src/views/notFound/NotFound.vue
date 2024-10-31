<template>
  <div class="not-found">
    <div class="not-found__state">404</div>
    <div class="not-found__title">Page not found</div>
    <div class="not-found__desc">很抱歉，您访问的页面不存在！</div>
    <div class="not-found__operate">
      <el-button type="primary" @click="$router.replace('/')">回到首页</el-button>
      <el-link :underline="false" @click="$router.back()">
        返回上一页<span aria-hidden="true">&rarr;</span>
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts" name="NotFoundView"></script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__state {
    font-size: 26px;
    font-weight: bold;
    color: var(--color-primary);
  }

  &__title {
    font-size: 60px;
    margin: var(--spacing-extra-large) 0;
  }

  &__desc {
    font-size: var(--text-size-medium);
    color: var(--text-color-secondary);
  }

  &__operate {
    display: flex;
    gap: 0 var(--spacing-extra-large);
    margin-top: var(--spacing-extra-large);
  }
}
</style>
