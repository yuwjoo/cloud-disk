<template>
  <header class="flex items-center justify-between box-border px-5 h-[var(--header-height)] shadow">
    <div class="flex items-center" >
      <div class="text-[22px] cursor-pointer" @click="toggleCollapse()">
        <i :aria-expanded="!isCollapse" class="block i-ep:expand aria-expanded:i-ep:fold" />
      </div>
      <div class="flex items-center text-primary m-l-8">
        <i class="text-[28px] inline-block i-ep:partly-cloudy"/>
        <span class="text-[20px]">cloud-disk</span>
      </div>
    </div>
    <div class="flex items-center">
      <div class="text-[20px] font-bold cursor-pointer hover:text-primary" @click="toggleDark">
        <i :aria-pressed="isDark" class="block i-ep:sunny aria-pressed:i-ep:moon" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isCollapse = ref<boolean>(false); // 是否展开侧边栏
const isDark = ref<boolean>(false); // 是否深色模式

/**
 * @description: 切换侧边栏折叠状态
 */
function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}

/**
 * @description: 切换深色模式
 * @param {MouseEvent} event 点击事件
 */
function toggleDark(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  // @ts-ignore
  const transition = document.startViewTransition(() => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    isDark.value = root.classList.contains('dark');
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    );
  });
}
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}
::view-transition-new(root) {
  z-index: 1;
}
</style>
