/*
 * @FileName: 数据文件-面包屑项
 * @FilePath: \cloud-disk\src\components\feature\FeatureBreadcrumbItem.ts
 * @Author: YH
 * @Date: 2024-05-21 17:04:23
 * @LastEditors: YH
 * @LastEditTime: 2024-05-22 11:31:41
 * @Description:
 */
import type { ExtractPropTypes } from 'vue';

export type FeatureBreadcrumbItemEmits = {
  clickItem: [to: string | object];
};

export type FeatureBreadcrumbItemProps = ExtractPropTypes<typeof featureBreadcrumbItemProps>;

export const featureBreadcrumbItemProps = {
  // 路由跳转目标
  to: {
    type: [String, Object],
    required: false
  },
  // 是否替换路由
  replace: {
    type: Boolean,
    default: false
  },
  // 禁用路由跳转
  disabledRouter: {
    type: Boolean,
    default: false
  }
};
