<template>
  <div class="settings">
    <el-page-header
      class="settings__header"
      :icon="ArrowLeft"
      title="返回"
      @back="() => $router.replace('/')"
    >
      <template #content>
        <el-text tag="b">系统设置</el-text>
      </template>

      <template #default>
        <el-scrollbar class="settings__content">
          <el-form
            class="settings__content-form"
            :model="form"
            label-width="auto"
            label-position="top"
          >
            <el-form-item label="基础">
              <el-card class="settings__content-card">测试内容</el-card>
            </el-form-item>
            <el-form-item label="外观">
              <el-card class="settings__content-card">测试3内容</el-card>
            </el-form-item>
            <el-form-item label="上传/下载">
              <el-card class="settings__content-card">测试3内容</el-card>
            </el-form-item>
            <el-form-item label="存储">
              <el-card class="settings__content-card">测试3内容</el-card>
            </el-form-item>
            <el-form-item label="其他">
              <el-card class="settings__content-card">测试3内容</el-card>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts" name="SettingsView">
import { ArrowLeft } from '@element-plus/icons-vue';

const form = ref({});
</script>

<style lang="scss" scoped>
.settings {
  height: 100%;

  .settings__header {
    display: flex;
    flex-direction: column;
  }

  .settings__content {
    display: flex;
    justify-content: center;
    height: 100%;

    .settings__content-form {
      width: 450px;
    }

    .settings__content-card {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
