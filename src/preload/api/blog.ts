import { invoke } from '@/utils/ipcRenderer';
import { BlogApi } from 'common/types/electronApi';

export const blog: BlogApi = {
  /**
   * @description: 获取列表
   */
  list() {
    return invoke('blog-list');
  },
  /**
   * @description: 添加
   */
  add(data) {
    return invoke('blog-add', data);
  },
  /**
   * @description: 更新
   */
  update(data) {
    return invoke('blog-update', data);
  },
  /**
   * @description: 删除
   */
  delete(data) {
    return invoke('blog-delete', data);
  }
};
