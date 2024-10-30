<!--
 * @FileName: 登录页
 * @FilePath: \cloud-disk\src\views\login\Login.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-10-30 16:35:58
 * @Description: 
-->
<template>
  <div class="login">
    <transition name="el-fade-in" mode="out-in">
      <login-panel v-if="currentPanel === 'login'" @toggle="currentPanel = 'register'" />
      <register-panel v-else @toggle="currentPanel = 'login'" />
    </transition>
  </div>
</template>

<script setup lang="ts" name="LoginView">
import LoginPanel from './components/LoginPanel.vue';
import RegisterPanel from './components/RegisterPanel.vue';
import type { CurrentPanel } from './types/login';

const currentPanel = ref<CurrentPanel>('login'); // 展示的面板名称
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
