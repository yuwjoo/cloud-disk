import { invoke } from '@/utils/ipcRenderer';
import { FileApi } from 'common/types/electronApi';

export const file: FileApi = {
  /**
   * @description: 读取文件
   */
  readFile(filePath) {
    return invoke('read-file', filePath);
  },
  /**
   * @description: 写入文件
   */
  writeFile(filePath, content) {
    return invoke('write-file', filePath, content);
  },
  /**
   * @description: 删除文件
   */
  deleteFile(filePath) {
    return invoke('delete-file', filePath);
  },
  /**
   * @description: 移动文件
   */
  moveFile(filePath, newFilePath) {
    return invoke('move-file', filePath, newFilePath);
  }
};
