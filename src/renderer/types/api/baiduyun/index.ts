import type { FileInfo } from '@/types/file';
import type { PageResponse } from '@/types/request';

export interface BaidunyunFileInfo extends FileInfo {
  id: number;
}

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
export type ApiGetBaiduyunFileListResponse = PageResponse<BaidunyunFileInfo>;

/**
 * @description: 创建百度云目录-请求参数
 */
export type ApiCreateBaiduyunDirRequest = {
  path: string; // 目录路径
};

/**
 * @description: 创建百度云目录-响应数据
 */
export type ApiCreateBaiduyunDirResponse = void;

/**
 * @description: 删除百度云目录/文件-请求参数
 */
export type ApiDeleteBaiduyunFileRequest = {
  filelist: string[]; // 文件路径列表
};

/**
 * @description: 删除百度云目录/文件-响应数据
 */
export type ApiDeleteBaiduyunFileResponse = void;

/**
 * @description: 重命名目录/文件-请求参数
 */
export type ApiRenameBaiduyunFileRequest = {
  id: number; // 文件id
  path: string; // 文件路径
  newname: string; // 新名称
};

/**
 * @description: 重命名目录/文件-响应数据
 */
export type ApiRenameBaiduyunFileResponse = void;

/**
 * @description: 下载百度云文件-请求参数
 */
export type ApiDownloadBaiduyunFileRequest = {
  id: number; // 文件id
};

/**
 * @description: 下载百度云文件-响应数据
 */
export type ApiDownloadBaiduyunFileResponse = {
  link: string;
};
