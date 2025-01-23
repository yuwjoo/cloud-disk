<template>
  <el-dialog
    v-model="dialogVisible"
    :title="newDocument.id ? '编辑文档' : '新增文档'"
    width="600px"
  >
    <el-form
      :model="newDocument"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newDocument.title" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input model-value="Markdown" placeholder="请输入" clearable disabled></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="newDocument.describe"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="请输入"
          resize="none"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="附加资源">
        <el-button type="primary" @click="handleEditDoc">上传文件</el-button>
        <el-button type="primary" @click="handleEditDoc">创建文档</el-button>
        <el-button type="danger" @click="handleEditDoc">批量删除</el-button>
        <el-table :data="newDocument.resources" stripe style="width: 100%">
          <el-table-column
            type="selection"
            :selectable="(row: any) => row.name !== 'README.md'"
            width="55"
            align="center"
          />
          <el-table-column prop="name" label="名称" align="left" />
          <el-table-column prop="type" label="操作" width="100" align="left">
            <el-link type="warning" @click="handleEditDoc">编辑</el-link>
            <el-link type="success" style="margin-left: 8px" @click="handleEditDoc">查看</el-link>
            <!-- <el-link type="success" @click="handleEditDoc">访问</el-link> -->
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { BlogData } from 'common/types/blog';
import { Row } from 'element-plus/es/components/table-v2/src/components/index.mjs';
import { ref } from 'vue';

const emit = defineEmits(['add-document', 'close-dialog']);

const dialogVisible = ref(false);
const newDocument = ref<BlogData>({
  id: '',
  title: '',
  describe: '',
  filePath: `./temp/${Date.now()}.md`,
  resources: []
});

// 添加表单校验规则
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
};

const formRef = useTemplateRef('formRef');

/**
 * @description: 显示对话框
 */
const show = (data?: BlogData) => {
  newDocument.value = data || {
    id: '',
    title: '',
    describe: '',
    filePath: `./temp/${Date.now()}.md`,
    resources: [
      {
        name: 'README.md',
        type: 'Markdown'
      },
      {
        name: '测试.md',
        type: 'Markdown'
      },
      {
        name: '压缩文件.zip',
        type: 'zip'
      }
    ]
  };
  dialogVisible.value = true;
};

/**
 * @description: 关闭对话框并触发关闭事件
 */
const closeDialog = () => {
  dialogVisible.value = false;
  emit('close-dialog');
};

/**
 * @description: 提交表单，验证通过后触发添加文档事件并关闭对话框
 */
const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('add-document', { ...newDocument.value });
      closeDialog();
    }
  });
};

const handleEditDoc = () => {
  window.open('/markdown?filePath=' + newDocument.value.filePath);
};

defineExpose({
  show
});
</script>
