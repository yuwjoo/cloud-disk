import { useRequest } from '@/library/axios';
import type {
  ApiGetFileListRequest,
  ApiGetFileListResponse,
  ApiCreateFileRequest,
  ApiCreateFileResponse,
  ApiRenameFileRequest,
  ApiRenameFileResponse,
  ApiMoveFileRequest,
  ApiMoveFileResponse,
  ApiDeleteFileRequest,
  ApiDeleteFileResponse,
  ApiBatchDeleteFileRequest,
  ApiBatchDeleteFileResponse,
  ApiDownloadFileRequest,
  ApiDownloadFileResponse
} from '@/types/api/common/storage';

/**
 * @description: 获取文件列表
 */
export function getFileList(params: ApiGetFileListRequest): Promise<ApiGetFileListResponse> {
  return useRequest({
    url: '/api/storage/list',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件/目录
 */
export function createFile(data: ApiCreateFileRequest): Promise<ApiCreateFileResponse> {
  return useRequest({
    url: '/api/storage/create',
    method: 'post',
    data
  });
}

/**
 * @description: 重命名文件/目录
 */
export function renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse> {
  return useRequest({
    url: '/api/storage/rename',
    method: 'post',
    data
  });
}

/**
 * @description: 移动文件/目录
 */
export function moveFile(data: ApiMoveFileRequest): Promise<ApiMoveFileResponse> {
  return useRequest({
    url: '/api/storage/move',
    method: 'post',
    data
  });
}

/**
 * @description: 删除文件/目录
 */
export function deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse> {
  return useRequest({
    url: '/api/storage/delete',
    method: 'post',
    data
  });
}

/**
 * @description: 批量删除文件/目录
 */
export function batchDeleteFile(
  data: ApiBatchDeleteFileRequest
): Promise<ApiBatchDeleteFileResponse> {
  return useRequest({
    url: '/api/storage/batchDelete',
    method: 'post',
    data
  });
}

/**
 * @description: 下载文件
 */
export function downloadFile(params: ApiDownloadFileRequest): Promise<ApiDownloadFileResponse> {
  return useRequest({
    url: '/api/storage/downloadFile',
    method: 'get',
    params
  });
}
