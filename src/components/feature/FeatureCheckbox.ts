/*
 * @FileName: 数据文件-复选框
 * @FilePath: \cloud-disk\src\components\feature\FeatureCheckbox.ts
 * @Author: YH
 * @Date: 2024-05-21 17:04:23
 * @LastEditors: YH
 * @LastEditTime: 2024-05-23 15:25:07
 * @Description:
 */
import type { ExtractPropTypes } from 'vue';

export type FeatureCheckboxSlots = {
  default: () => any;
};

export type FeatureCheckboxEmits = {
  change: [checked: boolean];
};

export type FeatureCheckboxProps = ExtractPropTypes<typeof featureCheckboxProps>;

export const featureCheckboxProps = {
  // 不确定状态
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: undefined
  },
  // 选中状态的值（配合FeatureCheckboxGroup时使用）
  value: {
    type: [String, Number, Boolean, Object],
    required: false
  }
};
