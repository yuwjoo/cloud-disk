import type { CommonResponse, PageResponse } from '@/types/request';
import type { FileInfo } from '@/types/file';

/**
 * @description: 获取文件列表-请求参数
 */
export type ApiGetFileListRequest = {
  parent: string; // 父级路径
};

/**
 * @description: 获取文件列表-响应数据
 */
export type ApiGetFileListResponse = PageResponse<FileInfo>;

/**
 * @description: 创建文件/目录-请求参数
 */
export type ApiCreateFileRequest = {
  parent: string; // 父级路径
  name: string; // 名称
  isDirectory: boolean; // 是否目录
  ossFileId?: string; // OSS文件ID
};

/**
 * @description: 创建文件/目录-响应数据
 */
export type ApiCreateFileResponse = CommonResponse<FileInfo>;

/**
 * @description: 重命名文件/目录-请求参数
 */
export type ApiRenameFileRequest = {
  parent: string; // 父级路径
  oldName: string; // 旧名称
  newName: string; // 新名称
};

/**
 * @description: 重命名文件/目录-响应数据
 */
export type ApiRenameFileResponse = CommonResponse<FileInfo>;

/**
 * @description: 移动文件/目录-请求参数
 */
export type ApiMoveFileRequest = {
  name: string; // 名称
  oldParent: string; // 旧父级路径
  newParent: string; // 新父级路径
};

/**
 * @description: 移动文件/目录-响应数据
 */
export type ApiMoveFileResponse = CommonResponse<FileInfo>;

/**
 * @description: 删除文件/目录-请求参数
 */
export type ApiDeleteFileRequest = {
  path: string; // 路径
};

/**
 * @description: 删除文件/目录-响应数据
 */
export type ApiDeleteFileResponse = CommonResponse;

/**
 * @description: 批量删除文件/目录-请求参数
 */
export type ApiBatchDeleteFileRequest = {
  paths: string[]; // 路径列表
};

/**
 * @description: 批量删除文件/目录-响应数据
 */
export type ApiBatchDeleteFileResponse = CommonResponse;

/**
 * @description: 下载文件-请求参数
 */
export type ApiDownloadFileRequest = {
  path: string; // 路径
};

/**
 * @description: 下载文件-响应数据
 */
export type ApiDownloadFileResponse = CommonResponse<string>;
