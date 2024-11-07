import {
  createDir,
  deleteFile,
  getDownloadUrl,
  getList,
  renameFile,
  searchFile
} from '@/api/baiduyun';
import { handle } from '@/utils/ipcMain';

/**
 * @description: 百度云-查询文件
 */
handle('baiduyun-search-file', (_event, data) => {
  return searchFile(data);
});

/**
 * @description: 百度云-获取列表数据
 */
handle('baiduyun-get-list', (_event, data) => {
  return getList(data);
});

/**
 * @description: 百度云-创建文件夹
 */
handle('baiduyun-create-dir', (_event, data) => {
  return createDir(data);
});

/**
 * @description: 百度云-重命名文件
 */
handle('baiduyun-rename-file', (_event, data) => {
  return renameFile(data);
});

/**
 * @description: 百度云-删除文件
 */
handle('baiduyun-delete-file', (_event, data) => {
  return deleteFile(data);
});

/**
 * @description: 百度云-获取下载地址
 */
handle('baiduyun-get-download-url', (_event, data) => {
  return getDownloadUrl(data);
});
