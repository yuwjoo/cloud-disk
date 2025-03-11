<template>
  <el-dialog v-model="visible" title="管理书签组" width="50%">
    <div class="group-manager">
      <div class="group-manager__header">
        <el-button type="primary" @click="handleAddGroup">
          <el-icon><Plus /></el-icon>
          添加书签组
        </el-button>
      </div>
      <div class="group-manager__list">
        <el-table :data="bookmarkGroups" style="width: 100%">
          <el-table-column prop="name" label="书签组名称">
            <template #default="{ row }">
              <div class="group-name">
                <el-icon><Folder /></el-icon>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bookmarks" label="书签数量">
            <template #default="{ row }">
              {{ row.bookmarks.length }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEditGroup(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button type="danger" link @click="handleDeleteGroup(row)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 添加/编辑书签组对话框 -->
    <el-dialog
      v-model="groupDialog.visible"
      :title="groupDialog.type === 'add' ? '添加书签组' : '编辑书签组'"
      width="30%"
      append-to-body
    >
      <el-form ref="groupFormRef" :model="groupForm" :rules="groupRules" label-width="80px">
        <el-form-item label="组名称" prop="name">
          <el-input v-model="groupForm.name" placeholder="请输入书签组名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="groupDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="submitGroupForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Edit, Delete, Folder } from "@element-plus/icons-vue";
import type { BookmarkGroup } from "../data";

const props = defineProps<{
  modelValue: boolean;
  bookmarkGroups: BookmarkGroup[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "add-group", group: BookmarkGroup): void;
  (e: "edit-group", group: BookmarkGroup): void;
  (e: "delete-group", groupId: string): void;
}>();

const visible = ref(false);

// 监听visible变化
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  }
);

watch(visible, (val) => {
  emit("update:modelValue", val);
});

// 书签组表单相关
const groupDialog = ref({
  visible: false,
  type: "add"
});

const groupForm = ref({
  id: "",
  name: ""
});

const groupRules = {
  name: [{ required: true, message: "请输入书签组名称", trigger: "blur" }]
};

const groupFormRef = ref();

// 添加书签组
const handleAddGroup = () => {
  groupDialog.value.type = "add";
  groupDialog.value.visible = true;
  groupForm.value = { id: "", name: "" };
};

// 编辑书签组
const handleEditGroup = (group: BookmarkGroup) => {
  groupDialog.value.type = "edit";
  groupDialog.value.visible = true;
  groupForm.value = { ...group };
};

// 删除书签组
const handleDeleteGroup = (group: BookmarkGroup) => {
  ElMessageBox.confirm("确定要删除该书签组吗？所有相关书签都将被删除。", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    emit("delete-group", group.id);
    ElMessage.success("删除成功");
  });
};

// 提交书签组表单
const submitGroupForm = async () => {
  if (!groupFormRef.value) return;
  await groupFormRef.value.validate((valid: boolean) => {
    if (valid) {
      if (groupDialog.value.type === "add") {
        const newGroup = {
          id: Date.now().toString(),
          name: groupForm.value.name,
          bookmarks: []
        };
        emit("add-group", newGroup);
      } else {
        emit("edit-group", {
          id: groupForm.value.id,
          name: groupForm.value.name,
          bookmarks: props.bookmarkGroups.find((g) => g.id === groupForm.value.id)?.bookmarks || []
        });
      }
      groupDialog.value.visible = false;
      ElMessage.success(groupDialog.value.type === "add" ? "添加成功" : "修改成功");
    }
  });
};
</script>

<style lang="scss" scoped>
.group-manager {
  padding: 20px;

  &__header {
    margin-bottom: 20px;
  }

  &__list {
    .group-name {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
