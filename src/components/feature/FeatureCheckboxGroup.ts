/*
 * @FileName: 数据文件-复选框组
 * @FilePath: \cloud-disk\src\components\feature\FeatureCheckboxGroup.ts
 * @Author: YH
 * @Date: 2024-05-21 17:04:23
 * @LastEditors: YH
 * @LastEditTime: 2024-05-23 13:23:57
 * @Description:
 */
import type { ExtractPropTypes, InjectionKey, ModelRef } from 'vue';
import type { FeatureCheckboxProps } from './FeatureCheckbox';

export type FeatureCheckboxGroupSlots = {
  default: () => any;
};

export type FeatureCheckboxGroupEmits = {
  change: [value: FeatureCheckboxGroupModel];
};

export type FeatureCheckboxGroupProps = ExtractPropTypes<typeof featureCheckboxGroupProps>;

export type FeatureCheckboxGroupModel = Required<FeatureCheckboxProps>['value'][];

export const featureCheckboxGroupProps = {
  // 复选框组元素标签
  tag: {
    type: String,
    required: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  }
};

export const featureCheckboxGroupKey: InjectionKey<{
  props: FeatureCheckboxGroupProps;
  model: ModelRef<FeatureCheckboxGroupModel>;
  switchCheckbox: (value: FeatureCheckboxGroupModel[0], selected: boolean) => void;
}> = Symbol('featureCheckboxGroupKey');
