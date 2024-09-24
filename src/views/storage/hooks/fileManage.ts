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
import { useUserStore } from '@/store/user';

export function useFileManage() {
  const loading = ref<boolean>(false); // 加载中
  const parentPath = ref<string>(useUserStore().user.storageOrigin); // 当前父级路径
  const pathList = computed(() => {
    const paths = [{ label: '全部文件', path: useUserStore().user.storageOrigin }];
    let parent = useUserStore().user.storageOrigin;

    for (const name of parentPath.value
      .slice(useUserStore().user.storageOrigin.length)
      .split('/')
      .filter(Boolean)) {
      parent += '/' + name;
      paths.push({ label: name, path: parent });
    }

    return paths;
  }); // 路径列表
  const fileList = ref<FileList>([]); // 文件列表
  const checkAll = ref(false); // 是否全选
  const isIndeterminate = ref(true); // 是否中间状态
  const checkedList = ref<string[]>([]); // 选中列表
  const deleteLoading = ref<boolean>(false); // 删除中

  getFileList();

  /**
   * @description: 获取文件列表
   */
  function getFileList() {
    loading.value = true;
    getDirectoryList({ parent: parentPath.value })
      .then((res) => {
        fileList.value = res.data.records;

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
        fetchCreateFolder({ folderPath: parentPath.value, name: ctx.inputValue })
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
        rename({ filePath: item.path, newName: ctx.inputValue })
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
    parentPath,
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
