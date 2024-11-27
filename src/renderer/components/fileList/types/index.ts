/**
 * @description: 列表数据项类型
 */
export type ItemType = Record<string, any>;

/**
 * @description: 文件数据项-类型
 */
export type FileItemType = 'file' | 'dir';

/**
 * @description: 文件数据项-操作指令
 */
export type FileItemCommand = 'download' | 'rename' | 'delete';

/**
 * @description: 文件数据项
 */
export type FileItem<T = any> = {
  name: string; // 名称
  size: number; // 大小
  type: FileItemType; // 类型
  cover?: string; // 封面
  updatedTime: number; // 更新时间戳
  operate?: {
    download?: boolean; // 下载
    rename?: boolean; // 重命名
    delete?: boolean; // 删除
  }; // 操作
  raw?: T; // 原始数据
};
