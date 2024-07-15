/**
 * @FileName: 页面-总览-文件列表-数据文件
 * @FilePath: \cloud-disk\src\views\overview\components\OverviewList.vue
 * @Author: YH
 * @Date: 2024-07-12 13:33:23
 * @LastEditors: YH
 * @LastEditTime: 2024-07-15 11:02:37
 * @Description:
 */
import type { ExtractPropTypes, PropType } from 'vue';

export type OverviewListEmits = {
  clickItem: [to: string | object];
};

export type OverviewListProps = ExtractPropTypes<typeof overviewListProps>;

export const overviewListProps = {
  // 列表
  list: {
    type: Array as PropType<OverviewListPropsList>,
    required: true
  }
};

export type OverviewListPropsList = {
  id: DirectorysTable['id']; // id
  name: DirectorysTable['name']; // 名称
  size: DirectorysTable['size']; // 大小
  type: DirectorysTable['type']; // 类型
  mimeType: DirectorysTable['mime_type']; // mime类型
  parentFolderId: DirectorysTable['id']; // 父级文件夹id
  createTime: number; // 创建日期时间戳
  modifiedTime: number; // 修改日期时间戳
}[];
