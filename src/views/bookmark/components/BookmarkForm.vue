<template>
  <el-dialog
    v-model="dialogVisible"
    :title="type === 'add' ? '添加书签' : '编辑书签'"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入书签标题" />
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" placeholder="请输入书签URL" />
      </el-form-item>
      <el-form-item label="所属分组" prop="groupId">
        <el-select v-model="form.groupId" placeholder="请选择书签组">
          <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

interface BookmarkGroup {
  id: string;
  name: string;
}

interface BookmarkForm {
  id: string;
  title: string;
  url: string;
  groupId: string;
}

interface Props {
  modelValue: boolean;
  type: 'add' | 'edit';
  groups: BookmarkGroup[];
  initialData?: BookmarkForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'submit']);

const dialogVisible = ref(props.modelValue);
const formRef = ref<FormInstance>();

// 监听对话框可见性
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

// 表单数据
const form = ref<BookmarkForm>({
  id: '',
  title: '',
  url: '',
  groupId: ''
});

// 监听初始数据
watch(() => props.initialData, (val) => {
  if (val) {
    form.value = { ...val };
  } else {
    resetForm();
  }
}, { immediate: true });

// 表单验证规则
const rules: FormRules = {
  title: [{ required: true, message: '请输入书签标题', trigger: 'blur' }],
  url: [
    { required: true, message: '请输入书签URL', trigger: 'blur' },
    { type: 'url', message: '请输入正确的URL格式', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
          callback(new Error('URL必须以http://或https://开头'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  groupId: [{ required: true, message: '请选择书签组', trigger: 'change' }]
};

// 重置表单
const resetForm = () => {
  form.value = {
    id: '',
    title: '',
    url: '',
    groupId: ''
  };
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

// 关闭对话框
const handleClose = () => {
  resetForm();
  dialogVisible.value = false;
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', { ...form.value });
      dialogVisible.value = false;
      ElMessage.success(props.type === 'add' ? '添加成功' : '修改成功');
    }
  });
};
</script>

<style lang="scss" scoped>
.bookmark-form {
  &__footer {
    padding: 20px 0 0;
    text-align: right;
  }
}
</style>