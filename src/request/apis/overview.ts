import type {
  CreateFileRequestQuery,
  CreateFileResponseData,
  GetDirectoryListRequestQuery,
  GetDirectoryListResponseData,
  GetResourceFlagRequestQuery,
  GetResourceFlagResponseData,
  DownloadFileRequestQuery,
  DownloadFileResponseData
} from 'types/src/request/apis/overview';
import { request } from '..';

/**
 * @description: 获取文件列表
 * @param {GetDirectoryListRequestQuery} params 参数
 * @return {Promise<GetDirectoryListResponseData>} 响应
 */
export function getDirectoryList(
  params: GetDirectoryListRequestQuery
): Promise<GetDirectoryListResponseData> {
  return request({
    url: '/fileSystem/getDirectoryList',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件
 * @param {CreateFileRequestQuery} params 参数
 * @return {Promise<CreateFileResponseData>} 响应
 */
export function createFile(params: CreateFileRequestQuery): Promise<CreateFileResponseData> {
  return request({
    url: '/fileSystem/createFile',
    method: 'get',
    params
  });
}

/**
 * @description: 获取资源标识
 * @param {GetResourceFlagRequestQuery} params 参数
 * @return {Promise<GetResourceFlagResponseData>} 响应
 */
export function getResourceFlag(
  params: GetResourceFlagRequestQuery
): Promise<GetResourceFlagResponseData> {
  return request({
    url: '/fileSystem/getResourceFlag',
    method: 'get',
    params
  });
}

/**
 * @description: 下载文件
 * @param {DownloadFileRequestQuery} params 参数
 * @return {Promise<DownloadFileResponseData>} 响应
 */
export function downloadFile(params: DownloadFileRequestQuery): Promise<DownloadFileResponseData> {
  return request({
    url: '/fileSystem/downloadFile',
    method: 'get',
    params
  });
}
