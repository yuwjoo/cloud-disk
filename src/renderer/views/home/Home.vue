<template>
  <div class="home-container">
    <h1 class="home-container__title">文档列表</h1>
    <div class="home-container__actions">
      <el-button type="primary" @click="showAddDialog">新增文档</el-button>
      <el-button type="danger" :disabled="!hasSelection" @click="batchDelete">批量删除</el-button>
    </div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" v-for="doc in list" :key="doc.id">
        <el-card class="document-card" shadow="hover">
          <div class="document-card__actions">
            <el-button-group>
              <el-button type="primary" size="small" @click="viewDocument(doc)">
                <el-icon><View /></el-icon>
              </el-button>
              <el-button type="warning" size="small" @click="editDocument(doc)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button type="danger" size="small" @click="deleteDocument(doc)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-button-group>
          </div>
          <el-checkbox class="document-card__checkbox" v-model="doc.selected">
            <div class="document-card__header">
              <span class="document-card__title">{{ doc.title }}</span>
            </div>
            <div class="document-card__content">
              <p>{{ doc.describe }}</p>
            </div>
            <div class="document-card__footer">
              <div class="document-card__footer-item">
                <el-icon><Calendar /></el-icon>
                2025/01/01
              </div>
              <div class="document-card__footer-item">
                <el-icon><Document /></el-icon>
                Markdown
              </div>
            </div>
          </el-checkbox>
        </el-card>
      </el-col>
    </el-row>

    <AddDocumentDialog
      @add-document="handleAddDocument"
      @close-dialog="handleCloseDialog"
      ref="addDocumentDialogRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Calendar, Document, View, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddDocumentDialog from './components/AddDocumentDialog.vue';
import { useElectronApi } from '@/hooks/electron';
import type { BlogData } from 'common/types/blog';

const list = ref<(BlogData & { selected: boolean })[]>([]);

const hasSelection = computed(() => list.value.some((doc) => doc.selected));

const addDocumentDialogRef = useTemplateRef('addDocumentDialogRef');

const electronApi = useElectronApi();

const setList = async () => {
  list.value = (await electronApi.blog.list()).map((item) => ({ ...item, selected: false }));
};

/**
 * @description: 查看文档
 * @param {object} doc 文档对象
 */
const viewDocument = (doc) => {
  window.open('/markdown?id=' + doc.id);
};

/**
 * @description: 编辑文档
 * @param {object} doc 文档对象
 */
const editDocument = (doc) => {
  addDocumentDialogRef.value?.show(doc);
};

/**
 * @description: 删除文档
 * @param {object} doc 文档对象
 */
const deleteDocument = (doc: BlogData) => {
  ElMessageBox.confirm(`确定要删除文档 "${doc.title}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await electronApi.blog.delete(doc);
      ElMessage.success('删除成功');
    })
    .catch(() => {});
};

/**
 * @description: 显示新增文档对话框
 */
const showAddDialog = () => {
  addDocumentDialogRef.value?.show();
};

/**
 * @description: 处理新增文档事件
 * @param {object} newDoc 新增文档对象
 */
const handleAddDocument = async (newDoc: BlogData) => {
  await electronApi.blog.add(newDoc);
  ElMessage.success('新增成功');
};

/**
 * @description: 处理关闭对话框事件
 */
const handleCloseDialog = () => {
  // 可以在这里处理关闭对话框后的逻辑
};

/**
 * @description: 批量删除文档
 */
const batchDelete = () => {
  const selectedDocs = unref(list).filter((doc) => doc.selected);
  if (selectedDocs.length === 0) {
    ElMessage.warning('请先选择要删除的文档');
    return;
  }
  ElMessageBox.confirm(`确定要删除选中的 ${selectedDocs.length} 个文档吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await Promise.all(selectedDocs.map((doc: BlogData) => electronApi.blog.delete(doc)));
      ElMessage.success('批量删除成功');
    })
    .catch(() => {});
};

setList();

electronApi.addListener('blog-broadcast', (_event, data) => {
  data.forEach((doc) => {
    if (doc.operate === 'add') {
      list.value.push({ ...doc.data, selected: false });
    } else if (doc.operate === 'update') {
      const index = list.value.findIndex((item) => item.id === doc.data.id);
      if (index !== -1) {
        list.value[index] = { ...list.value[index], ...doc.data };
      }
    } else if (doc.operate === 'delete') {
      list.value = list.value.filter((item) => item.id !== doc.data.id);
    }
  });
});
</script>

<style lang="scss" scoped>
.home-container {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem;

  &__title {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__actions {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
}

.el-row {
  margin-bottom: -1.5rem;
}

.el-col {
  margin-bottom: 1.5rem;
}

.document-card {
  height: 100%;
  position: relative;
  box-sizing: border-box;

  &:hover &__actions {
    opacity: 1;
  }

  &:deep(.el-card__body) {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 1rem 1rem 0;
  }

  &__checkbox {
    height: 100%;

    &:deep(.el-checkbox__input) {
      position: absolute;
      top: 0;

      .el-checkbox__inner {
        border: none;
      }
    }

    &:deep(.el-checkbox__label) {
      width: 100%;
      padding: 0;
    }
  }

  &__title {
    font-size: 1.125rem;
    font-weight: bold;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &__content {
    flex-grow: 1;
    padding: 1rem;

    p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;

    &-item {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: #6b7280;

      .el-icon {
        margin-right: 0.25rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-container {
    .el-col {
      width: 100%;
    }
  }
}
</style>
