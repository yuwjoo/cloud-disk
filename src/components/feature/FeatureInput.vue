<!--
 * @FileName: 功能组件-输入框
 * @FilePath: \cloud-disk\src\components\feature\FeatureInput.vue
 * @Author: YH
 * @Date: 2024-05-22 16:25:53
 * @LastEditors: YH
 * @LastEditTime: 2024-05-27 15:35:10
 * @Description: 
-->
<template>
  <label
    class="relative flex items-center p-y-1.5 p-x-3 rounded-md dark:bg-white/5 cursor-text rounded-md ring-inset ring-1 ring-gray-300 dark:ring-white/10 data-[active=true]:ring-2 data-[active=true]:ring-primary-600!"
    :data-active="active"
    @mousedown="handleMousedown()"
  >
    <div v-if="$slots.prefix || prefixIcon" class="flex m-r-1.5">
      <slot name="prefix">
        <BaseIcon :class="prefixIcon" />
      </slot>
    </div>

    <input
      class="peer flex-grow-1 placeholder:text-gray-400 bg-transparent"
      :value="modelValue"
      :type="innerType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      clearable
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus()"
      @blur="handleBlur()"
    />

    <div v-if="$slots.suffix || suffixIcon" class="flex m-l-1.5">
      <slot name="suffix">
        <BaseIcon :class="suffixIcon" />
      </slot>
    </div>

    <div
      v-if="clearable && modelValue"
      v-show="active"
      class="flex m-l-1.5 cursor-pointer text-4"
      @click="handleClear()"
    >
      <slot name="suffix">
        <BaseIcon class="i-ep:circle-close" />
      </slot>
    </div>

    <div
      v-if="showPassword"
      class="flex m-l-1.5 cursor-pointer text-4"
      @click="handleTogglePassword()"
    >
      <slot name="suffix">
        <BaseIcon :class="innerType !== 'password' ? 'i-ep:view' : 'i-ep:hide'" />
      </slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import type { FeatureInputSlots, FeatureInputEmits, FeatureInputModel } from './FeatureInput';
import { featureInputProps } from './FeatureInput';

defineSlots<FeatureInputSlots>();

const emits = defineEmits<FeatureInputEmits>();

const props = defineProps(featureInputProps);

const model = defineModel<FeatureInputModel>({ required: false }); // 绑定值

const innerType = ref(props.type); // 内部类型
const isFocus = ref<boolean>(false); // 是否聚焦
const isDown = ref<boolean>(false); // 鼠标按下
const active = computed(() => isFocus.value || isDown.value); // 激活状态

/**
 * @description: 处理鼠标按下
 */
function handleMousedown() {
  isDown.value = true;
  document.addEventListener('mouseup', () => (isDown.value = false), { once: true });
}

/**
 * @description: 处理输入
 * @param {Event} event 事件对象
 */
function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  model.value = value;
  emits('input', value);
}

/**
 * @description: 处理改变
 * @param {Event} event 事件对象
 */
function handleChange(event: Event) {
  emits('change', (event.target as HTMLInputElement).value);
}

/**
 * @description: 处理获取焦点
 */
function handleFocus() {
  isFocus.value = true;
  emits('focus');
}

/**
 * @description: 处理失去焦点
 */
function handleBlur() {
  isFocus.value = false;
  emits('blur');
}

/**
 * @description: 处理清除
 */
function handleClear() {
  model.value = '';
  emits('clear');
}

/**
 * @description: 处理切换密码显示
 */
function handleTogglePassword() {
  innerType.value = innerType.value === 'password' ? 'text' : 'password';
}
</script>
