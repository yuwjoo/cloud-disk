/**
 * @description: 文件数据项
 */
export interface FileItem<T = any> {
  name: string; // 名称
  size: number; // 大小
  type: 'file' | 'dir'; // 类型
  cover?: string; // 封面
  updatedTime: number; // 更新时间戳
  operate?: {
    download?: boolean; // 下载
    rename?: boolean; // 重命名
    delete?: boolean; // 删除
  }; // 操作
  raw?: T; // 原始数据
}
