import { useLoadingFetch } from '@/hooks/common';
import { useRoute, useRouter } from '@/hooks/vueRouter';
import type { useSearch } from './search';
import type { FileItem, FileItemCommand } from '@/components/fileList/types';
import type { List, ListItem } from '../types';
import { deleteFile, downloadFile, getFileList, renameFile } from '@/api/storage';
import { joinCloudPath, parseCloudRelativePath } from '../utils';

/**
 * @description: 列表逻辑-hook
 */
export function useList(search: ReturnType<typeof useSearch>['search']) {
  const checkedList = ref<List>([]); // 选中数据列表

  const list = ref<List>([]); // 文件列表

  const [loading, fetchList] = useLoadingFetch(async () => {
    const res = await getFileList({
      parent: joinCloudPath(search.dir)
    });
    checkedList.value = [];
    list.value = res.data.records || [];
  }, true);

  /**
   * @description: 处理解析文件项
   */
  const handleParseItem = (item: ListItem): FileItem => {
    return {
      name: item.name,
      size: item.size,
      type: item.type === 'directory' ? 'dir' : 'file',
      cover: '',
      updatedTime: item.updatedTime,
      operate: {
        download: item.type !== 'directory',
        rename: true,
        delete: true
      }
    };
  };

  /**
   * @description: 处理点击文件项
   */
  const handleClickItem = (item: ListItem) => {
    if (item.type === 'directory') {
      // 进入文件夹
      useRouter().push({
        name: useRoute().name,
        query: {
          path: parseCloudRelativePath(item.path)
        }
      });
    } else {
      // 浏览文件
    }
  };

  /**
   * @description: 处理操作文件项
   */
  const handleOperateItem = (command: FileItemCommand, item: ListItem) => {
    const handler: Record<FileItemCommand, () => void> = {
      rename: () => {
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
              await renameFile({
                parent: item.parent,
                oldName: item.name,
                newName: ctx.inputValue
              });
              ElMessage({
                type: 'success',
                message: '修改成功'
              });
              close();
              fetchList();
            } finally {
              ctx.confirmButtonLoading = false;
            }
          }
        }).catch(() => {});
      },
      delete: () => {
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
              await deleteFile({
                path: item.path
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
      },
      download: () => {
        downloadFile({ path: item.path }).then((res) => {
          const a = document.createElement('a');
          a.href = res.data;
          a.download = 'download';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      }
    };
    handler[command]();
  };

  watch(search, () => fetchList());

  return {
    search,
    list,
    checkedList,
    loading,
    fetchList,
    handleParseItem,
    handleClickItem,
    handleOperateItem
  };
}
