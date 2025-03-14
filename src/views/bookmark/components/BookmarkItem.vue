<template>
  <el-card class="bookmark-item" shadow="hover">
    <div class="bookmark-item__content" @click="openBookmark(bookmark.url)">
      <el-image :src="favicon" class="bookmark-item__favicon" @load="onFaviconLoad">
        <template #error>
          <el-icon class="bookmark-item__favicon"><Picture /></el-icon>
        </template>
      </el-image>
      <div class="bookmark-item__info">
        <h3 class="bookmark-item__title">{{ bookmark.title }}</h3>
        <p class="bookmark-item__url">{{ bookmark.url }}</p>
      </div>
    </div>
    <div class="bookmark-item__actions">
      <el-dropdown trigger="click" @click.stop @command="handleCommand">
        <el-button type="primary" link>
          <el-icon><MoreFilled /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-dropdown-item>
            <el-dropdown-item command="delete">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Edit, Delete, MoreFilled, Picture } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref } from "vue";
import type { Bookmark } from "../data";
import { extractDominantColor } from "../utils/colorExtractor";
import { loadFavicon } from "../utils/faviconExtractor";

interface Props {
  bookmark: Bookmark;
}

const props = defineProps<Props>();
const emit = defineEmits(["edit", "delete"]);
const dominantColor = ref("rgba(255, 255, 255, 0.1)");
const favicon = ref("");

// 打开书签
const openBookmark = (url: string) => {
  window.open(url, "_blank");
};

// 处理下拉菜单命令
const handleCommand = async (command: string) => {
  switch (command) {
    case "edit":
      emit("edit", props.bookmark);
      break;
    case "delete":
      ElMessageBox.confirm("确定要删除该书签吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        emit("delete", props.bookmark);
        ElMessage.success("删除成功");
      });
      break;
  }
};

// 图标加载完成时提取主色调
const onFaviconLoad = (event: Event) => {
  const imgElement = event.target as HTMLImageElement;
  dominantColor.value = extractDominantColor(imgElement);
};

// 初始化加载图标
loadFavicon(props.bookmark.iconUrl).then(url => {
  favicon.value = url;
});
</script>

<style lang="scss" scoped>
.bookmark-item {
  box-sizing: border-box;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, v-bind(dominantColor), transparent);
    backdrop-filter: blur(10px);
    z-index: 0;
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    z-index: 1;
  }

  &__favicon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &__info {
    flex: 1;
    overflow: hidden;
  }

  &__title {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__url {
    margin: 4px 0 0;
    font-size: 12px;
    color: #909399;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: none;
    z-index: 1;
  }

  &:hover {
    .bookmark-item__actions {
      display: block;
    }
  }

  :deep(.el-dropdown-menu__item) {
    .el-icon {
      margin-right: 8px;
    }
  }
}
</style>
