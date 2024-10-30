/**
 * @description: 文件信息
 */
export interface FileInfo {
  path: string; // 路径
  parent: string; // 父级路径
  depth: number; // 深度
  size: number; // 大小
  name: string; // 名称
  type: string; // 类型
  createdTime: number; // 创建时间戳
  updatedTime: number; // 更新时间戳
  readable: boolean; // 可读
  writable: boolean; // 可写
}
