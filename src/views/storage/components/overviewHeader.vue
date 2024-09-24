<!--
 * @FileName: 页面-总览-头部
 * @FilePath: \cloud-disk\src\views\overview\components\overviewHeader.vue
 * @Author: YH
 * @Date: 2024-09-04 21:39:10
 * @LastEditors: YH
 * @LastEditTime: 2024-09-05 13:14:57
 * @Description: 
-->
<template>
  <div class="overview-header">
    <!-- 导航模块 start -->
    <div class="overview-header__nav">
      <template v-if="navList.length > 1">
        <el-icon class="overview-header__back" @click="handleNav(navList[navList.length - 2])">
          <i-ep-back />
        </el-icon>
        <el-divider direction="vertical" />
      </template>
      <el-breadcrumb class="overview-header__breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item, index) in navList" :key="index" @click="handleNav(item)">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 导航模块 end -->

    <div class="overview-header__operate">
      <!-- 上传按钮 start -->
      <el-dropdown ref="uploadDropdownRef" @command="handleUpload">
        <el-button class="overview-header__dropdown-btn" type="primary" @click="handleClickUpload">
          <el-icon class="el-icon--left"><i-ep-upload /></el-icon>
          <span>上传</span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="file">上传文件</el-dropdown-item>
            <el-dropdown-item command="folder">上传文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 上传按钮 end -->

      <!-- 新建文件夹 start -->
      <el-button type="primary" @click="handleCreateFolder">
        <el-icon class="el-icon--left"><i-ep-folder-add /></el-icon>
        <span>新建文件夹</span>
      </el-button>
      <!-- 新建文件夹 end -->

      <!-- 删除所选 start -->
      <el-button type="danger" :disabled="!checkedList.length" @click="handleDeleteFile">
        <el-icon class="el-icon--left"><i-ep-delete /></el-icon>
        <span>删除所选</span>
      </el-button>
      <!-- 删除所选 end -->
    </div>

    <!-- 系统文件对话框 start -->
    <input
      class="select-file"
      ref="selectFileRef"
      type="file"
      multiple
      @change="handleSelectFile"
    />
    <!-- 系统文件对话框 end -->
  </div>
</template>

<script setup lang="ts">
import { createFolder, deleteFiles } from '@/api/overview';
import { addUploadTask } from '@/utils/uploadManager';
import type { ElDropdown } from 'element-plus/es';

type Nav = {
  name: string;
  path: string;
};

type Emits = {
  nav: [path: string]; // 导航
  addFile: [file: any]; // 添加文件
  change: []; // 改变
};

const emits = defineEmits<Emits>();
const props = defineProps({
  parentPath: {
    type: String,
    default: '/'
  }, // 父级路径
  checkedList: {
    type: Object as PropType<string[]>,
    required: true
  } // 选中的文件
});
const navList = computed<Nav[]>(() => {
  if (props.parentPath === '/') {
    return [{ name: '全部文件', path: '/' }];
  }
  return props.parentPath.split('/').map((name) => ({
    name: name || '全部文件',
    path: props.parentPath.slice(0, props.parentPath.indexOf(name)) + name || '/'
  }));
}); // 导航列表
const uploadDropdownRef = ref<InstanceType<typeof ElDropdown>>(); // 上传下拉组件ref
const selectFileRef = ref<HTMLInputElement>(); // 选择文件ref

/**
 * @description: 处理导航
 * @param {Nav} item 导航项
 */
function handleNav(item?: Nav) {
  emits('nav', item?.path || '/');
}

/**
 * @description: 处理上传指令
 * @param {string} command 指令
 */
function handleUpload(command: string) {
  if (!selectFileRef.value) return;
  if (command === 'folder') {
    selectFileRef.value.setAttribute('webkitdirectory', 'webkitdirectory');
  } else {
    selectFileRef.value.removeAttribute('webkitdirectory');
  }
  selectFileRef.value.value = '';
  selectFileRef.value.click();
}

/**
 * @description: 处理点击上传按钮
 */
function handleClickUpload() {
  uploadDropdownRef.value?.handleClose();
  handleUpload('file');
}

/**
 * @description: 处理选择的文件
 */
function handleSelectFile() {
  for (const file of selectFileRef.value!.files || []) {
    addUploadTask({
      file,
      uploadName: file.name,
      uploadPath: props.parentPath,
      onSuccess: (res) => {
        if (res.data.folderPath === props.parentPath) {
          emits('addFile', res.data.file);
        }
      }
    });
  }
}

/**
 * @description: 处理创建文件夹
 */
function handleCreateFolder() {
  ElMessageBox.prompt('请输入文件夹名称', '创建文件夹', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[^"*<>?\\|/:]+$/,
    inputErrorMessage: '名称不合法',
    beforeClose: (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      createFolder({
        folderPath: props.parentPath,
        name: ctx.inputValue
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '创建成功'
          });
          emits('change');
          close();
        })
        .finally(() => {
          ctx.confirmButtonLoading = false;
        });
    }
  }).catch(() => {});
}

/**
 * @description: 处理删除文件
 */
function handleDeleteFile() {
  ElMessageBox.confirm('即将删除选中文件，是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: (action, ctx, close) => {
      if (action !== 'confirm') {
        close();
        return;
      }
      ctx.confirmButtonLoading = true;
      deleteFiles({
        filePaths: props.checkedList
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          emits('change');
          close();
        })
        .finally(() => {
          ctx.confirmButtonLoading = false;
        });
    }
  }).catch(() => {});
}
</script>

<style lang="scss" scoped>
.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-small);
  flex-shrink: 0;

  .overview-header__nav {
    display: flex;
    align-items: center;

    .overview-header__back {
      font-size: 18px;
      cursor: pointer;
      margin-right: var(--spacing-small);

      &:hover {
        color: var(--color-primary);
      }
    }

    .overview-header__breadcrumb {
      font-weight: bold;

      :deep(.el-breadcrumb__item):not(:last-child) {
        cursor: pointer;

        .el-breadcrumb__inner:hover {
          color: var(--color-primary);
        }
      }
    }
  }

  .overview-header__operate {
    display: flex;
    gap: 0 var(--spacing-small);

    .overview-header__dropdown-btn {
      outline-style: none;
    }

    .el-button {
      margin-left: 0;
    }
  }

  .select-file {
    display: none;
  }
}
</style>
