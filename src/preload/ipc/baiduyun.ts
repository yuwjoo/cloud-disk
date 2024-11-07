import { BaiduyunApi } from 'common/types/electron-api';
import { invoke } from '@/utils/ipcRenderer';

export const baiduyun: BaiduyunApi = {
  /**
   * @description: 百度云-查询文件
   */
  searchFile(data) {
    return invoke('baiduyun-search-file', data);
  },

  /**
   * @description: 百度云-获取列表数据
   */
  getList(data) {
    return invoke('baiduyun-get-list', data);
  },

  /**
   * @description: 百度云-创建文件夹
   */
  createDir(data) {
    return invoke('baiduyun-create-dir', data);
  },

  /**
   * @description: 百度云-重命名文件
   */
  renameFile(data) {
    return invoke('baiduyun-rename-file', data);
  },

  /**
   * @description: 百度云-删除文件
   */
  deleteFile(data) {
    return invoke('baiduyun-delete-file', data);
  },

  /**
   * @description: 百度云-获取下载地址
   */
  getDownloadUrl(data) {
    return invoke('baiduyun-get-download-url', data);
  }
};
