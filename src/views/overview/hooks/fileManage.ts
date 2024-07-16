import {
  getDirectoryList,
  createFolder as fetchCreateFolder,
  downloadFile as fetchDownloadFile
} from '@/api/overview';
import dayjs from 'dayjs';
import type { FileList, PathList } from '../types/fileManage';

export function useFileManage() {
  const loading = ref<boolean>(false); // 加载中
  const pathList = ref<PathList>([]); // 路径列表
  const fileList = ref<FileList>([]); // 文件列表
  const currentFolderId = ref<number>(); // 当前文件夹id

  getFileList();

  /**
   * @description: 获取文件列表
   * @param {number} folderId 文件夹id
   */
  function getFileList(folderId?: number) {
    loading.value = true;
    getDirectoryList({ parentFolderId: folderId || currentFolderId.value })
      .then((res) => {
        pathList.value = (res.data.folderPathList || []).map((item) => ({
          ...item,
          folderName: item.folderName === '/' ? '全部文件' : item.folderName
        }));
        fileList.value = (res.data.directoryList || []).map((item) => ({
          ...item,
          modifiedDate: dayjs(item.modifiedTime).format('YYYY-MM-DD HH:mm')
        }));
        currentFolderId.value = pathList.value.slice(-1)[0].folderId;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /**
   * @description: 创建文件
   */
  function createFolder() {
    ElMessageBox.prompt('请输入文件夹名称', '创建文件夹', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[^"*<>?\\|/:]+$/,
      inputErrorMessage: '文件夹名称不合法',
      beforeClose: (action, ctx, close) => {
        if (action !== 'confirm') {
          close();
          return;
        }
        ctx.confirmButtonLoading = true;
        fetchCreateFolder({ parentFolderId: currentFolderId.value, folderName: ctx.inputValue })
          .then(() => {
            ElMessage({
              type: 'success',
              message: '创建成功'
            });
            close();
          })
          .finally(() => {
            ctx.confirmButtonLoading = false;
          });
      }
    }).then(() => {
      getFileList();
    });
  }

  /**
   * @description: 下载文件
   * @param {number} fileId 文件id
   */
  function downloadFile(fileId: number) {
    fetchDownloadFile({ fileId }).then((res) => {
      const a = document.createElement('a');
      a.href = res.data;
      a.download = 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  return { loading, currentFolderId, pathList, fileList, getFileList, createFolder, downloadFile };
}
