import { addUploadTask } from '@/utils/uploadManager';
import type { useSearch } from './search';
import type { useList } from './list';
import { batchDeleteFile, createFile } from '@/api/storage';
import { joinCloudPath } from '../utils';

/**
 * @description: header逻辑-hook
 */
export function useHeader(
  search: ReturnType<typeof useSearch>['search'],
  checkedList: ReturnType<typeof useList>['checkedList'],
  fetchList: ReturnType<typeof useList>['fetchList']
) {
  /**
   * @description: 处理文件上传
   * @param {File[]} files 选择的文件
   */
  const handleUploadFile = (files: File[]) => {
    for (const file of files) {
      addUploadTask({
        file,
        uploadName: file.name,
        uploadPath: search.dir,
        onSuccess: () => {
          fetchList();
        }
      });
    }
  };

  /**
   * @description: 处理创建文件夹
   */
  const handleCreateFolder = () => {
    ElMessageBox.prompt('请输入文件夹名称', '创建文件夹', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[^"*<>?\\|/:]+$/,
      inputErrorMessage: '名称不合法',
      beforeClose: async (action, ctx, close) => {
        if (action !== 'confirm') {
          close();
          return;
        }
        ctx.confirmButtonLoading = true;
        try {
          await createFile({
            parent: joinCloudPath(search.dir),
            name: ctx.inputValue,
            isDirectory: true
          });
          ElMessage({
            type: 'success',
            message: '创建成功'
          });
          close();
          fetchList();
        } finally {
          ctx.confirmButtonLoading = false;
        }
      }
    }).catch(() => {});
  };

  /**
   * @description: 处理批量删除
   */
  const handleBatchDelete = () => {
    ElMessageBox.confirm('即将删除选中文件，是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: async (action, ctx, close) => {
        if (action !== 'confirm') {
          close();
          return;
        }
        ctx.confirmButtonLoading = true;
        try {
          await batchDeleteFile({
            paths: unref(checkedList).map((item) => item.path)
          });
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          close();
          fetchList();
        } finally {
          ctx.confirmButtonLoading = false;
        }
      }
    }).catch(() => {});
  };

  return { handleUploadFile, handleCreateFolder, handleBatchDelete };
}
