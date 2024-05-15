<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-6xl font-semibold text-primary-600">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
        Page not found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">很抱歉，我们找不到您要查找的页面！</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <div
          class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
          @click="$router.replace('/')"
        >
          回到首页
        </div>
        <div class="text-sm font-semibold text-gray-900 cursor-pointer dark:text-gray-100" @click="$router.back()">
          返回上一页 <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </div>
  </main>
</template>
