import {
  createBaiduyunDir,
  deleteBaiduyunFile,
  downloadBaiduyunFile,
  renameBaiduyunFile
} from '@/api/baiduyun';
import type { BaidunyunFileInfo } from '@/types/api/baiduyun';
import { addUploadTask } from '@/utils/uploadManager';
import type { useList } from './list';

/**
 * @description: 文件操作相关-hook
 */
export function useFileOperate(
  search: ReturnType<typeof useList>['search'],
  checkedList: ReturnType<typeof useList>['checkedList'],
  refreshList: ReturnType<typeof useList>['refreshList']
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
          refreshList();
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
          await createBaiduyunDir({
            path: search.dir + '/' + ctx.inputValue
          });
          ElMessage({
            type: 'success',
            message: '创建成功'
          });
          close();
          refreshList();
        } catch (err) {
          /* empty */
        }
        ctx.confirmButtonLoading = false;
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
          await deleteBaiduyunFile({
            filelist: checkedList.value.map((item) => item.path)
          });
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          close();
          refreshList();
        } catch (err) {
          /* empty */
        }
        ctx.confirmButtonLoading = false;
      }
    }).catch(() => {});
  };

  /**
   * @description: 处理下载
   */
  const handleDownload = (item: BaidunyunFileInfo) => {
    downloadBaiduyunFile({ id: item.id }).then((res) => {
      const a = document.createElement('a');
      a.href = res.link;
      a.download = 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  /**
   * @description: 处理重命名
   */
  const handleRename = (item: BaidunyunFileInfo) => {
    ElMessageBox.prompt(`将“${item.name}”修改为：`, '重命名', {
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
          await renameBaiduyunFile({
            id: item.id,
            path: item.path,
            newname: ctx.inputValue
          });
          ElMessage({
            type: 'success',
            message: '修改成功'
          });
          close();
          refreshList();
        } catch (err) {
          /* empty */
        }
        ctx.confirmButtonLoading = false;
      }
    }).catch(() => {});
  };

  /**
   * @description: 处理删除
   */
  const handleDelete = (item: BaidunyunFileInfo) => {
    ElMessageBox.confirm(`即将删除“${item.name}”，是否继续?`, '提示', {
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
          await deleteBaiduyunFile({
            filelist: [item.path]
          });
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          close();
          refreshList();
        } catch (err) {
          /* empty */
        }
        ctx.confirmButtonLoading = false;
      }
    }).catch(() => {});
  };

  return {
    handleUploadFile,
    handleCreateFolder,
    handleBatchDelete,
    handleDownload,
    handleRename,
    handleDelete
  };
}
