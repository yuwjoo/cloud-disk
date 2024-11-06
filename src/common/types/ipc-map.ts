import {
  WINDOW_CHANGE_MAXIMIZE,
  WINDOW_CHANGE_FULL_SCREEN,
  BAIDUYUN_SEARCH_FILE,
  WINDOW_RESTORE
} from 'common/ipc-constants';
import { ApiSearchFileRequest, ApiSearchFileResponse } from './api/baiduyun';

/**
 * @description: 事件集合
 */
export interface EventMap {
  [WINDOW_CHANGE_MAXIMIZE]: [isMaximize: boolean];
  [WINDOW_CHANGE_FULL_SCREEN]: [isFullScreen: boolean];
}

/**
 * @description: 通道集合
 */
export interface ChannelMap {
  [BAIDUYUN_SEARCH_FILE]: [data: ApiSearchFileRequest, result: ApiSearchFileResponse];
  [WINDOW_RESTORE]: [];
}
