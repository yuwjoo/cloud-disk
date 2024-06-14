/*
 * @FileName: 数据文件-悬浮按钮
 * @FilePath: \cloud-disk\src\components\feature\FeatureFloatingButton.ts
 * @Author: YH
 * @Date: 2024-05-21 16:46:05
 * @LastEditors: YH
 * @LastEditTime: 2024-05-22 11:29:47
 * @Description:
 */
import type { ExtractPropTypes } from 'vue';

export type FeatureFloatingButtonSlots = {
  default: () => any;
};

export type FeatureFloatingButtonProps = ExtractPropTypes<typeof featureFloatingButtonProps>;

export const featureFloatingButtonProps = {
  // 偏移值
  offset: {
    type: Number,
    default: 0
  }
};
