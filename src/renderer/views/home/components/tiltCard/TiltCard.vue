<template>
  <div class="tilt-card" ref="card">
    <div class="tilt-card__inner" ref="cardInner">
      <div class="tilt-card__bg" ref="cardBg" :style="{ backgroundImage: `url(${bg})` }">
        <slot name="backround"></slot>
      </div>
      <div class="tilt-card__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TiltCard">
import useTiltHover from './hooks/tiltHover';

export interface PropsType {
  bg: string; // 背景图片地址
}

const { bg } = defineProps<PropsType>();

const cardRef = useTemplateRef('card');
const cardInnerRef = useTemplateRef('cardInner');
const cardBgRef = useTemplateRef('cardBg');

onMounted(() => {
  useTiltHover({
    container: cardRef.value!,
    content: cardInnerRef.value!,
    background: cardBgRef.value!
  });
});
</script>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.tilt-card {
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .tilt-card__inner {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }

    .tilt-card__bg {
      transition:
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
      opacity: 0.8;
    }
  }

  .tilt-card__inner {
    position: relative;
    flex: 0 0 240px;
    width: 240px;
    height: 320px;
    background-color: #333;
    overflow: hidden;
    border-radius: 10px;
    box-shadow:
      rgba(black, 0.66) 0 30px 60px 0,
      inset #333 0 0 0 5px,
      inset rgba(white, 0.5) 0 0 0 6px;
    transition: 1s $returnEasing;
  }

  .tilt-card__bg {
    opacity: 0.5;
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition:
      1s $returnEasing,
      opacity 5s 1s $returnEasing;
    pointer-events: none;
    background-color: #2a2b38;
  }

  .tilt-card__content {
    padding: 20px;
    position: absolute;
    bottom: 0;
    color: #fff;
  }
}
</style>
