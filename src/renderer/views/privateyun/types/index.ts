import type { ApiGetFileListResponse } from '@/types/api/storage';

/**
 * @description: 筛选条件
 */
export type Search = {
  dir: string; // 目录路径
};

/**
 * @description: 列表数据
 */
export type List = ApiGetFileListResponse['data']['records'];

/**
 * @description: 列表数据项
 */
export type ListItem = List[0];
