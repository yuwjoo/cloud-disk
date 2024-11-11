import type { FileInfo } from '@/types/file';
import type { PageResponse } from '@/types/request';

/**
 * @description: 获取百度云文件列表-请求参数
 */
export type ApiGetBaiduyunFileListRequest = {
  dir: string; // 目录路径
  current: number; // 当前页
  size: number; // 每页条数
};

/**
 * @description: 获取百度云文件列表-响应数据
 */
export type ApiGetBaiduyunFileListResponse = PageResponse<FileInfo>;
