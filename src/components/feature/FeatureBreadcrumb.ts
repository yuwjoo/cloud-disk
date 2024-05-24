/*
 * @FileName: 数据文件-面包屑
 * @FilePath: \cloud-disk\src\components\feature\FeatureBreadcrumb.ts
 * @Author: YH
 * @Date: 2024-05-21 16:46:05
 * @LastEditors: YH
 * @LastEditTime: 2024-05-22 11:29:47
 * @Description:
 */
import type { InjectionKey, ExtractPropTypes } from 'vue';

export type FeatureBreadcrumbSlots = {
  default: () => any;
};

export type FeatureBreadcrumbProps = ExtractPropTypes<typeof featureBreadcrumbProps>;

export const featureBreadcrumbProps = {
  // 分隔符
  separator: {
    type: String,
    default: '/'
  },
  // 分隔符图标
  separatorIcon: {
    type: String,
    required: false
  }
};

export const featureBreadcrumbKey: InjectionKey<FeatureBreadcrumbProps> =
  Symbol('featureBreadcrumbKey');
