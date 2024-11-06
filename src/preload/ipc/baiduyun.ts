import { ipcRenderer } from 'electron';
import {
  BAIDUYUN_CREATE_DIR,
  BAIDUYUN_DELETE_FILE,
  BAIDUYUN_GET_DOWNLOAD_URL,
  BAIDUYUN_GET_LIST,
  BAIDUYUN_RENAME_FILE,
  BAIDUYUN_SEARCH_FILE
} from 'common/ipc-constants';
import { BaiduyunApi } from 'common/types/electron-api';

export const baiduyun: BaiduyunApi = {
  /**
   * @description: 百度云-查询文件
   */
  searchFile(data) {
    return ipcRenderer.invoke(BAIDUYUN_SEARCH_FILE, data);
  },

  /**
   * @description: 百度云-获取列表数据
   */
  getList(data) {
    return ipcRenderer.invoke(BAIDUYUN_GET_LIST, data);
  },

  /**
   * @description: 百度云-创建文件夹
   */
  createDir(data) {
    return ipcRenderer.invoke(BAIDUYUN_CREATE_DIR, data);
  },

  /**
   * @description: 百度云-重命名文件
   */
  renameFile(data) {
    return ipcRenderer.invoke(BAIDUYUN_RENAME_FILE, data);
  },

  /**
   * @description: 百度云-删除文件
   */
  deleteFile(data) {
    return ipcRenderer.invoke(BAIDUYUN_DELETE_FILE, data);
  },

  /**
   * @description: 百度云-获取下载地址
   */
  getDownloadUrl(data) {
    return ipcRenderer.invoke(BAIDUYUN_GET_DOWNLOAD_URL, data);
  }
};
