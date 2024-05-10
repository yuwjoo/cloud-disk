<template>
  <div class="text-gray-7 dark:text-gray-1">
    <common-header />
    <div class="flex h-[calc(100vh-var(--header-height))]">
      <aside class="w-[var(--aside-expand-width)]">nav</aside>
      <main class="flex-grow-1 dark:bg-[rgba(0,0,0,.4)]">main</main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
