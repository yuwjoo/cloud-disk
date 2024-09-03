import {
  getDirectoryList,
  createFolder as fetchCreateFolder,
  downloadFile as fetchDownloadFile,
  deleteFiles,
  rename
} from '@/api/overview';
import dayjs from 'dayjs';
import { useFileSystem } from '@/store/fileSystem';
import type { FileList, PathList } from '../types/fileManage';

export function useFileManage() {
  const loading = ref<boolean>(false); // 加载中
  const pathList = ref<PathList>([]); // 路径列表
  const fileList = ref<FileList>([]); // 文件列表
  const currentFolderPath = ref<string>('/'); // 当前文件夹路径
  const checkAll = ref(false); // 是否全选
  const isIndeterminate = ref(true); // 是否中间状态
  const checkedList = ref<string[]>([]); // 选中列表
  const deleteLoading = ref<boolean>(false); // 删除中

  getFileList();

  /**
   * @description: 获取文件列表
   * @param {string} folderPath 文件夹路径
   */
  function getFileList(folderPath?: string) {
    loading.value = true;
    getDirectoryList({ folderPath: folderPath || currentFolderPath.value })
      .then((res) => {
        const data = res.data;
        const paths = [{ label: '全部文件', path: '/' }];
        let parentPath = '';

        for (const name of data.folderPath.split('/').filter(Boolean)) {
          parentPath += '/' + name;
          paths.push({ label: name, path: parentPath });
        }

        pathList.value = paths;
        fileList.value = (data.list || []).map((item) => ({
          ...item,
          modifiedDate: dayjs(item.modifiedTime).format('YYYY-MM-DD HH:mm')
        }));
        currentFolderPath.value = data.folderPath;

        checkAll.value = false;
        isIndeterminate.value = false;
        checkedList.value = [];
        useFileSystem().searchValue = '';
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /**
   * @description: 创建文件夹
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
        fetchCreateFolder({ folderPath: currentFolderPath.value, name: ctx.inputValue })
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
   * @param {string} filePath 文件路径
   */
  function downloadFile(filePath: string) {
    fetchDownloadFile({ filePath }).then((res) => {
      const a = document.createElement('a');
      a.href = res.data;
      a.download = 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  /**
   * @description: 删除文件
   */
  function deleteFile() {
    ElMessageBox.confirm('即将删除选中文件，是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        deleteLoading.value = true;
        deleteFiles({
          filePaths: checkedList.value
        })
          .then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功'
            });
            getFileList();
          })
          .finally(() => {
            deleteLoading.value = false;
          });
      })
      .catch(() => {});
  }

  /**
   * @description: 重命名文件
   * @param {FileList} item 当前文件
   */
  function renameFile(item: FileList[0]) {
    ElMessageBox.prompt(`将“${item.name}”更换为：`, '重命名文件', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[^"*<>?\\|/:]+$/,
      inputErrorMessage: '文件名称不合法',
      beforeClose: (action, ctx, close) => {
        if (action !== 'confirm') {
          close();
          return;
        }
        ctx.confirmButtonLoading = true;
        rename({ filePath: item.fullPath, newName: ctx.inputValue })
          .then(() => {
            ElMessage({
              type: 'success',
              message: '重命名成功'
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

  return {
    loading,
    currentFolderPath,
    pathList,
    fileList,
    checkAll,
    isIndeterminate,
    checkedList,
    deleteLoading,
    getFileList,
    createFolder,
    downloadFile,
    deleteFile,
    renameFile
  };
}
