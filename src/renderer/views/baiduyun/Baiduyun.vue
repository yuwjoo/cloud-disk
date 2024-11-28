<!--
 * @FileName: 百度云盘
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\Baiduyun.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-28 14:32:32
 * @Description: 
-->
<template>
  <BaiduyunMain v-if="accessToken" />
  <BaiduyunLogin v-else @login="setAccessToken" />
</template>

<script setup lang="ts" name="BaiduyunView">
import BaiduyunLogin from './components/login/Login.vue';
import BaiduyunMain from './components/main/Main.vue';
import { useAccessToken } from './hooks/accessToken';

// localStorage.removeItem('baiduyun_access_token');

const { accessToken, setAccessToken } = useAccessToken();
</script>

<style lang="scss" scoped>
.baiduyun {
  height: 100%;
  display: flex;
  flex-direction: column;

  .baiduyun-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);

    .baiduyun-header__right-create-btn {
      margin-left: 12px;
    }
  }
}
</style>
