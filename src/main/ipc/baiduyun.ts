import { ipcMain } from 'electron';
import { BAIDUYUN_SEARCH_FILE } from 'common/ipc-constants';
import { ApiSearchFileRequest, ApiSearchFileResponse } from 'common/types/baiduyun';
import { searchFile } from '@/api/baiduyun';

/**
 * @description: 百度云-查询文件
 */
ipcMain.handle(
  BAIDUYUN_SEARCH_FILE,
  (_event, data: ApiSearchFileRequest): Promise<ApiSearchFileResponse> => {
    return searchFile(data);
  }
);
