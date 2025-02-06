import { useRequest } from '@/hooks/axios';
import type {
  ApiPreCheckFileRequest,
  ApiPreCheckFileResponse,
  ApiGetMultipartsRequest,
  ApiGetMultipartsResponse,
  ApiMergeMultipartRequest,
  ApiMergeMultipartResponse
} from '@/types/api/upload';

/**
 * @description: 预检查文件
 */
export function preCheckFile(params: ApiPreCheckFileRequest): Promise<ApiPreCheckFileResponse> {
  return useRequest({
    url: '/api/upload/preCheckFile',
    method: 'get',
    params
  });
}

/**
 * @description: 获取分片集合
 */
export function getMultiparts(data: ApiGetMultipartsRequest): Promise<ApiGetMultipartsResponse> {
  return useRequest({
    url: '/api/upload/getMultiparts',
    method: 'post',
    data
  });
}

/**
 * @description: 合并上传的分片
 */
export function mergeMultipart(data: ApiMergeMultipartRequest): Promise<ApiMergeMultipartResponse> {
  return useRequest({
    url: '/api/upload/mergeMultipart',
    method: 'post',
    data
  });
}
