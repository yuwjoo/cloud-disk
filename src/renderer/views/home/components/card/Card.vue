<template>
  <div class="card-wrap" ref="cardWrap">
    <div class="card" ref="card">
      <div class="card-bg" ref="cardBg" :style="{ backgroundImage: `url(${dataImage})` }"></div>
      <div class="card-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Card">
import useTiltHover from './hooks/tiltHover';

export interface PropsType {
  dataImage: string; // 背景图片地址
}

const { dataImage } = defineProps<PropsType>();

const cardWrapRef = useTemplateRef('cardWrap');
const cardRef = useTemplateRef('card');
const cardBgRef = useTemplateRef('cardBg');

onMounted(() => {
  useTiltHover({
    container: cardWrapRef.value!,
    content: cardRef.value!,
    background: cardBgRef.value!
  });
});
</script>
