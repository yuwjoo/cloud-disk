<!--
 * @FileName: 百度云盘
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\Baiduyun.vue
 * @Author: YH
 * @Date: 2024-09-24 11:14:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-14 17:53:52
 * @Description: 
-->
<template>
  <div v-if="true" class="baiduyun" v-loading="loading">
    <div class="baiduyun-header">
      <dir-breadcrumb class="baiduyun-header__left" :path="search.dir" />

      <div class="baiduyun-header__right">
        <upload-button @select="handleUploadFile" />

        <el-button
          class="baiduyun-header__right-create-btn"
          type="primary"
          @click="handleCreateFolder"
        >
          <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
          <span>新建文件夹</span>
        </el-button>

        <el-button v-if="checkedList.length" type="danger" @click="handleBatchDelete">
          <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
          <span>批量删除</span>
        </el-button>
      </div>
    </div>

    <FileList
      v-model:checked-list="checkedList"
      :list="fileList"
      @click-item="handleClickItem"
      @operate-item="handleOperateItem"
    />
  </div>

  <baiduyun-login v-else />
</template>

<script setup lang="ts" name="BaiduyunView">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import {
  createBaiduyunDir,
  deleteBaiduyunFile,
  downloadBaiduyunFile,
  getBaiduyunFileList,
  renameBaiduyunFile
} from '@/api/baiduyun';
import { addUploadTask } from '@/utils/uploadManager';
import type { Search } from './types/baiduyun';
import type { BaidunyunFileInfo } from '@/types/api/baiduyun';
import BaiduyunLogin from './components/Login.vue';
import type { FileItem } from '@/components/fileList/types/fileList';

const route = useRoute();

const router = useRouter();

const search = reactive<Search>({
  dir: (route.query.path as string) || '/' // 目录路径
});

const list = ref<BaidunyunFileInfo[]>([]); // 文件列表

const fileList = computed(() =>
  list.value.map<FileItem<BaidunyunFileInfo>>((item) => {
    return {
      name: item.name,
      size: item.size,
      type: item.type === 'file' ? 'file' : 'dir',
      cover: '',
      path: item.path,
      updatedTime: item.updatedTime,
      operate: {
        download: item.type === 'file',
        rename: true,
        delete: true
      },
      raw: item
    };
  })
);

const loading = ref<boolean>(false); // 加载中

const checkedList = ref<BaidunyunFileInfo[]>([]); // 选中数据列表

/**
 * @description: 处理点击文件
 */
const handleClickItem = (item: BaidunyunFileInfo) => {
  if (item.type === 'directory') {
    // 进入文件夹
    router.push({
      name: route.name,
      query: {
        path: item.path
      }
    });
  } else {
    // 浏览文件
  }
};

/**
 * @description: 处理操作文件
 */
const handleOperateItem = (command: string, item: BaidunyunFileInfo) => {
  switch (command) {
    case 'download':
      handleDownload(item);
      break;
    case 'rename':
      handleRename(item);
      break;
    case 'delete':
      handleDelete(item);
      break;
  }
};

/**
 * @description: 刷新列表
 */
const refreshList = async () => {
  loading.value = true;
  try {
    const res = await getBaiduyunFileList({ dir: search.dir, current: 1, size: 1000 });
    list.value = res.data.records || [];
  } catch (err) {
    /* empty */
  }
  loading.value = false;
};

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

onBeforeRouteUpdate((to) => {
  search.dir = (to.query.path as string) || '/';
  refreshList();
});

refreshList();
</script>

<style lang="scss" scoped>
.baiduyun {
  height: 100%;
  display: flex;
  flex-direction: column;

  .baiduyun-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);

    .baiduyun-header__right-create-btn {
      margin-left: 12px;
    }
  }
}
</style>
