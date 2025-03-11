<template>
  <div class="bookmark">
    <el-card class="bookmark__groups">
      <template #header>
        <BookmarkHeader @manage-groups="groupManagerVisible = true" />
      </template>
      <el-collapse v-model="activeGroup">
        <el-collapse-item v-for="group in bookmarkGroups" :key="group.id" :name="group.id">
          <template #title>
            <div class="bookmark__group-title">
              <div class="bookmark__group-info">
                <el-icon><Folder /></el-icon>
                <span class="bookmark__group-name">{{ group.name }}</span>
              </div>
            </div>
          </template>
          <div class="bookmark__group-content">
            <div class="bookmark__list">
              <div v-for="bookmark in group.bookmarks" :key="bookmark.id" class="bookmark__item-wrapper">
                <BookmarkItem
                  :bookmark="bookmark"
                  @edit="handleEditBookmark"
                  @delete="handleDeleteBookmark"
                />
              </div>
              <!-- 添加书签占位卡片 -->
              <div class="bookmark__item-wrapper">
                <el-card class="bookmark__add-card" shadow="hover" @click="handleAddBookmark">
                  <div class="bookmark__add-content">
                    <el-icon :size="24"><Plus /></el-icon>
                    <span>添加书签</span>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- 书签表单 -->
    <BookmarkForm
      v-model="bookmarkDialog.visible"
      :type="bookmarkDialog.type"
      :groups="bookmarkGroups"
      :initial-data="bookmarkForm"
      @submit="handleBookmarkSubmit"
    />

    <!-- 书签组管理器 -->
    <BookmarkGroupManager
      v-model="groupManagerVisible"
      :bookmark-groups="bookmarkGroups"
      @add-group="handleAddGroup"
      @edit-group="handleEditGroup"
      @delete-group="handleDeleteGroup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Folder } from "@element-plus/icons-vue";
import BookmarkForm from "./components/BookmarkForm.vue";
import BookmarkHeader from "./components/BookmarkHeader.vue";
import BookmarkItem from "./components/BookmarkItem.vue";
import BookmarkGroupManager from "./components/BookmarkGroupManager.vue";
import { defaultBookmarkGroups, type BookmarkGroup, type Bookmark } from "./data";

// 书签组数据
const bookmarkGroups = ref<BookmarkGroup[]>(defaultBookmarkGroups);

// 当前选中的书签组
const activeGroup = ref("1");

// 书签表单相关
const bookmarkDialog = ref<{
  visible: boolean;
  type: 'add' | 'edit';
}>({
  visible: false,
  type: 'add'
});

const bookmarkForm = ref({
  id: "",
  title: "",
  url: "",
  groupId: ""
});

// 书签组管理器相关
const groupManagerVisible = ref(false);

// 添加书签组
const handleAddGroup = (group: BookmarkGroup) => {
  bookmarkGroups.value.push(group);
};

// 编辑书签组
const handleEditGroup = (group: BookmarkGroup) => {
  const index = bookmarkGroups.value.findIndex((g) => g.id === group.id);
  if (index !== -1) {
    bookmarkGroups.value[index] = group;
  }
};

// 删除书签组
const handleDeleteGroup = (groupId: string) => {
  bookmarkGroups.value = bookmarkGroups.value.filter((g) => g.id !== groupId);
};

// 添加书签
const handleAddBookmark = () => {
  bookmarkDialog.value.type = "add";
  bookmarkDialog.value.visible = true;
  bookmarkForm.value = {
    id: "",
    title: "",
    url: "",
    groupId: activeGroup.value
  };
};

// 编辑书签
const handleEditBookmark = (bookmark: Bookmark) => {
  bookmarkDialog.value.type = "edit";
  bookmarkDialog.value.visible = true;
  bookmarkForm.value = { ...bookmark, groupId: activeGroup.value };
};

// 删除书签
const handleDeleteBookmark = (bookmark: Bookmark) => {
  ElMessageBox.confirm("确定要删除该书签吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    const groupIndex = bookmarkGroups.value.findIndex((g) => g.id === activeGroup.value);
    if (groupIndex !== -1) {
      bookmarkGroups.value[groupIndex].bookmarks = bookmarkGroups.value[groupIndex].bookmarks.filter(
        (b) => b.id !== bookmark.id
      );
      ElMessage.success("删除成功");
    }
  });
};

// 处理书签表单提交
const handleBookmarkSubmit = (formData: Bookmark) => {
  const groupIndex = bookmarkGroups.value.findIndex((g) => g.id === activeGroup.value);
  if (groupIndex === -1) return;

  if (bookmarkDialog.value.type === "add") {
    const newBookmark = {
      id: Date.now().toString(),
      title: formData.title,
      url: formData.url
    };
    bookmarkGroups.value[groupIndex].bookmarks.push(newBookmark);
  } else {
    const bookmarkIndex = bookmarkGroups.value[groupIndex].bookmarks.findIndex((b) => b.id === formData.id);
    if (bookmarkIndex !== -1) {
      bookmarkGroups.value[groupIndex].bookmarks[bookmarkIndex] = {
        id: formData.id,
        title: formData.title,
        url: formData.url
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark {
  padding: 20px;

  &__groups {
    margin-bottom: 20px;
  }

  &__group {
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-name {
      font-size: 14px;
    }

    &-actions {
      display: flex;
      gap: 8px;
    }

    &-content {
      padding: 16px;
    }
  }

  &__list {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__item-wrapper {
    flex: 0 0 calc(25% - 15px);
    min-width: 200px;
  }

  &__add {
    &-card {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.02);
      border: 2px dashed #dcdfe6;
      transition: all 0.3s;

      &:hover {
        border-color: var(--el-color-primary);
        background-color: rgba(var(--el-color-primary-rgb), 0.1);
      }
    }

    &-content {
      height: 100%;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      color: #909399;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
