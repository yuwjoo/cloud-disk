import request from '@/utils/request';
import type {
  CreateFileRequestQuery,
  CreateFileResponseBody,
  GetDirectoryListRequestQuery,
  GetDirectoryListResponseBody,
  GetResourceFlagRequestQuery,
  GetResourceFlagResponseBody,
  DownloadFileRequestQuery,
  DownloadFileResponseBody,
  CreateFolderRequestQuery,
  CreateFolderResponseBody
} from 'types/src/api/overview';

/**
 * @description: 获取文件列表
 * @param {GetDirectoryListRequestQuery} params 参数
 * @return {Promise<GetDirectoryListResponseBody>} 响应
 */
export function getDirectoryList(
  params?: GetDirectoryListRequestQuery
): Promise<GetDirectoryListResponseBody> {
  return request({
    url: '/fileSystem/getDirectoryList',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件
 * @param {CreateFileRequestQuery} params 参数
 * @return {Promise<CreateFileResponseBody>} 响应
 */
export function createFile(params: CreateFileRequestQuery): Promise<CreateFileResponseBody> {
  return request({
    url: '/fileSystem/createFile',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件夹
 * @param {CreateFolderRequestQuery} params 参数
 * @return {Promise<CreateFolderResponseBody>} 响应
 */
export function createFolder(params: CreateFolderRequestQuery): Promise<CreateFolderResponseBody> {
  return request({
    url: '/fileSystem/createFolder',
    method: 'get',
    params
  });
}

/**
 * @description: 获取资源标识
 * @param {GetResourceFlagRequestQuery} params 参数
 * @return {Promise<GetResourceFlagResponseBody>} 响应
 */
export function getResourceFlag(
  params: GetResourceFlagRequestQuery
): Promise<GetResourceFlagResponseBody> {
  return request({
    url: '/fileSystem/getResourceFlag',
    method: 'get',
    params
  });
}

/**
 * @description: 下载文件
 * @param {DownloadFileRequestQuery} params 参数
 * @return {Promise<DownloadFileResponseBody>} 响应
 */
export function downloadFile(params: DownloadFileRequestQuery): Promise<DownloadFileResponseBody> {
  return request({
    url: '/fileSystem/downloadFile',
    method: 'get',
    params
  });
}
