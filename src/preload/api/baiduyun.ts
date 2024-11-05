import { ipcRenderer } from 'electron';
import { BAIDUYUN_SEARCH_FILE } from 'common/ipc-constants';
import { ApiCreateDirResponse, ApiSearchFileRequest } from 'common/types/baiduyun';

/**
 * @description: 百度云-查询文件
 */
export function searchFile(data: ApiSearchFileRequest): Promise<ApiCreateDirResponse> {
  return ipcRenderer.invoke(BAIDUYUN_SEARCH_FILE, data);
}
