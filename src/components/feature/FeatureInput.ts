/*
 * @FileName: 数据文件-输入框
 * @FilePath: \cloud-disk\src\components\feature\FeatureInput.ts
 * @Author: YH
 * @Date: 2024-05-21 17:04:23
 * @LastEditors: YH
 * @LastEditTime: 2024-05-27 15:31:39
 * @Description:
 */
import type { ExtractPropTypes } from 'vue';

export type FeatureInputSlots = {
  // 前缀内容
  prefix?: () => any;
  // 后缀内容
  suffix?: () => any;
};

export type FeatureInputEmits = {
  input: [value: FeatureInputModel];
  change: [value: FeatureInputModel];
  focus: [];
  blur: [];
  clear: [];
};

export type FeatureInputProps = ExtractPropTypes<typeof featureInputProps>;

export type FeatureInputModel = string | number;

export const featureInputProps = {
  // 类型
  type: {
    type: String as PropType<'text' | 'number' | 'password'>,
    default: 'text'
  },
  // 占位符
  placeholder: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  // 显示清除
  clearable: {
    type: Boolean,
    default: false
  },
  // 原生 autocomplete 属性
  autocomplete: {
    type: String,
    default: 'off'
  },
  // 自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  // 自定义前缀图标
  prefixIcon: {
    type: String,
    required: false
  },
  // 自定义后缀图标
  suffixIcon: {
    type: String,
    required: false
  },
  // 是否显示切换密码图标
  showPassword: {
    type: Boolean,
    default: false
  }
};
