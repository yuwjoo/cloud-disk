<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100"
      >
        注册你的账号
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister()">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >账号</label
          >
          <div class="mt-2">
            <FeatureInput v-model="form.account" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >密码</label
            >
          </div>
          <div class="mt-2">
            <FeatureInput v-model="form.password" type="password" show-password />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >昵称</label
            >
          </div>
          <div class="mt-2">
            <FeatureInput v-model="form.nickname" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            注册
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        已经注册账号?
        <a
          href="#"
          class="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          @click="$router.replace('/login')"
        >
          前往登录</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiRegister } from '@/api/types/auth';
import { register } from '@/api/auth';
import { useRouter } from '@/library/vue-router';

const form = ref<ApiRegister.Request>({
  account: '',
  password: '',
  nickname: ''
});

/**
 * @description: 处理注册
 */
function handleRegister() {
  register(form.value).then(() => {
    ElMessage({ type: 'success', message: '注册成功' });
    useRouter().replace('/login');
  });
}
</script>
