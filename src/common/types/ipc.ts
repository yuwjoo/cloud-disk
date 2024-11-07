import {
  ApiCreateDirRequest,
  ApiCreateDirResponse,
  ApiDeleteFileRequest,
  ApiDeleteFileResponse,
  ApiGetDownloadUrlRequest,
  ApiGetDownloadUrlResponse,
  ApiGetListRequest,
  ApiGetListResponse,
  ApiRenameFileRequest,
  ApiRenameFileResponse,
  ApiSearchFileRequest,
  ApiSearchFileResponse
} from 'common/types/api/baiduyun';

export interface IpcC<P extends any[] = [], R = void> {
  params: P;
  result: R;
}

/**
 * @description: IPC事件集合
 */
export interface IpcEventMap {
  'window-change-maximize': [isMaximize: boolean]; // 窗口-监听最大化改变
  'window-change-full-screen': [isFullScreen: boolean]; // 窗口-监听全屏改变
}

/**
 * @description: IPC通道集合
 */
export interface IpcChannelMap {
  'window-maximize': IpcC; // 窗口-最大化
  'window-minimize': IpcC; // 窗口-最小化
  'window-restore': IpcC; // 窗口-还原
  'window-close': IpcC; // 窗口-还原
  'window-toggle-full-screen': IpcC<[isFull?: boolean]>; // 窗口-切换全屏状态

  'baiduyun-search-file': IpcC<[data: ApiSearchFileRequest], Promise<ApiSearchFileResponse>>; // 百度云-搜索文件
  'baiduyun-get-list': IpcC<[data: ApiGetListRequest], Promise<ApiGetListResponse>>; // 百度云-获取列表数据
  'baiduyun-create-dir': IpcC<[data: ApiCreateDirRequest], Promise<ApiCreateDirResponse>>; // 百度云-创建文件夹
  'baiduyun-rename-file': IpcC<[data: ApiRenameFileRequest], Promise<ApiRenameFileResponse>>; // 百度云-重命名文件
  'baiduyun-delete-file': IpcC<[data: ApiDeleteFileRequest], Promise<ApiDeleteFileResponse>>; // 百度云-删除文件
  'baiduyun-get-download-url': IpcC<
    [data: ApiGetDownloadUrlRequest],
    Promise<ApiGetDownloadUrlResponse>
  >; // 百度云-获取下载地址
}
