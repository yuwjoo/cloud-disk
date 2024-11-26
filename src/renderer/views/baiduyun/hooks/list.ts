import { deleteFile, getDownloadUrl, getList, renameFile } from '@/api/baiduyun';
import type { FileItem, FileItemCommand } from '@/components/fileList/FileList.vue';
import { useLoadingFetch } from '@/hooks/common';
import { useRoute } from '@/hooks/vueRouter';
import type { ApiGetListResponse } from '@/types/api/baiduyun';
import { useRouter } from 'vue-router';
import type { useSearch } from './search';

/**
 * @description: 列表数据
 */
export type List = ApiGetListResponse['list'];

/**
 * @description: 列表数据项
 */
export type ListItem = List[0];

/**
 * @description: 列表逻辑-hook
 */
export function useList(search: ReturnType<typeof useSearch>['search']) {
  const checkedList = ref<List>([]); // 选中数据列表

  const list = ref<List>([]); // 文件列表

  const [loading, fetchList] = useLoadingFetch(async () => {
    const res = await getList({
      dir: search.dir,
      page: 1,
      num: 1000
    });
    checkedList.value = [];
    list.value = res.list || [];
  }, true);

  /**
   * @description: 处理解析文件项
   */
  const handleParseItem = (item: ListItem): FileItem => {
    return {
      name: item.server_filename,
      size: item.size,
      type: item.isdir ? 'dir' : 'file',
      cover: '',
      updatedTime: item.local_mtime * 1000,
      operate: {
        download: !item.isdir,
        rename: true,
        delete: true
      }
    };
  };

  /**
   * @description: 处理点击文件项
   */
  const handleClickItem = (item: ListItem) => {
    if (item.isdir) {
      // 进入文件夹
      useRouter().push({
        name: useRoute().name,
        query: {
          path: item.path
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
        ElMessageBox.prompt(`将“${item.server_filename}”修改为：`, '重命名', {
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
                filelist: [
                  {
                    id: item.fs_id,
                    path: item.path,
                    newname: ctx.inputValue
                  }
                ]
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
        ElMessageBox.confirm(`即将删除“${item.server_filename}”，是否继续?`, '提示', {
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
                filelist: [item.path]
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
        getDownloadUrl({ fsids: [item.fs_id] }).then((res) => {
          const a = document.createElement('a');
          a.href = res.list[0].dlink;
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
