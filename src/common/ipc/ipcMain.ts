import { BAIDUYUN_SEARCH_FILE, WINDOW_RESTORE } from 'common/ipc-constants';
import { ApiSearchFileRequest, ApiSearchFileResponse } from 'common/types/api/baiduyun';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

type IpcMainCallback<T = unknown, K = unknown> = (event: IpcMainInvokeEvent, data: T) => K;

interface IpcMainMap {
  [BAIDUYUN_SEARCH_FILE]: IpcMainCallback<ApiSearchFileRequest, ApiSearchFileResponse>;
  [WINDOW_RESTORE]: IpcMainCallback;
}

export function on<K extends keyof IpcMainMap>(channel: K, callback: IpcMainMap[K]) {
  ipcMain.on(channel, callback);
}

type SearchFileFunction = IpcMainCallback<ApiSearchFileRequest, ApiSearchFileResponse>;

type AA = Parameters<SearchFileFunction>[1];

type BB<K> = K extends IpcMainCallback<infer T> ? T : never;

const cc: BB<SearchFileFunction> = {
    key: '',
    num: 0,
    page: 0
}