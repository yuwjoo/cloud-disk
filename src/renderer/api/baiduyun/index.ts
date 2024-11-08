import { useElectronApi } from '@/hooks/electron';
import type { ApiGetFileListRequest, ApiGetFileListResponse } from '@/types/api/common/storage';

const electronApi = useElectronApi();

/**
 * @description: 获取文件列表
 */
export async function getBaiduyunFileList(
  params: ApiGetFileListRequest
): Promise<ApiGetFileListResponse> {
  const res = await electronApi.baiduyun.getList({
    dir: params.parent,
    num: 100,
    page: 1
  });
  console.log(res);
}
