<template>
  <div class="flex items-center justify-between">
    <FeatureCheckbox
      v-model="checkAll"
      :indeterminate="indeterminate"
      class="m-b-5"
      @change="handleChangeAll"
    >
      <span v-if="indeterminate || checkAll" class="text-sm text-primary-600"
        >已选中{{ selectionList.length }}个文件/文件夹</span
      >
      <span v-else class="text-sm text-gray-500">全选</span>
    </FeatureCheckbox>
    <div class="hidden">
      <BaseIcon class="i-ep:delete" />
    </div>
  </div>
  <div class="m-l--5">
    <FeatureCheckboxGroup v-model="selectionList" :disabled="disabled">
      <div
        v-for="(file, index) in fileList"
        class="group relative inline-block m-l-5 m-b-5 p-2 w-30 box-border cursor-pointer hover:bg-gray-100 rounded-md dark:hover:bg-primary-600/10"
        :key="index"
        @click="emits('click', file)"
      >
        <div
          class="hidden absolute top-2 left-2 group-hover:block data-[selected=true]:block"
          :data-selected="selectionList.includes(file.name)"
        >
          <FeatureCheckbox :value="file.name" />
        </div>
        <div class="hidden absolute top-1.5 right-2 group-hover:block">
          <BaseIcon class="i-ep:download text-gray-500 dark:text-gray-100" />
        </div>
        <img
          v-if="file.type === 'folder'"
          class="block m-auto w-15 h-15"
          src="@/assets/images/fileSystem/small/folder.png"
          alt=""
          @dragstart.prevent
        />
        <img
          v-else
          class="block m-auto w-15 h-15"
          src="@/assets/images/fileSystem/small/compressedFile.png"
          alt=""
          @dragstart.prevent
        />
        <div
          class="text-sm hover:text-primary-600 whitespace-nowrap text-ellipsis overflow-hidden"
          :title="file.name"
        >
          {{ file.name }}
        </div>
      </div>
    </FeatureCheckboxGroup>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fileList: {
    type: Array as PropType<{ name: string; type: string }[]>,
    default: () => [
      { name: '全功能运营后台1', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'folder' },
      { name: '全功能运营后台', type: 'zip' },
      { name: '全功能运营后台', type: 'zip' },
      { name: '全功能运营后台', type: 'zip' }
    ]
  }
});

const emits = defineEmits<{
  click: [file: any];
}>();

const checkAll = ref<boolean>(false); // 全选
const indeterminate = ref<boolean>(false); // 不确定状态
const selectionList = ref<string[]>([]); // 复选框列表
const disabled = ref<boolean>(false);

watchEffect(() => {
  const selectLength = selectionList.value.length;
  const fileLength = props.fileList.length;

  checkAll.value = selectLength === fileLength;
  indeterminate.value = selectLength > 0 && selectLength < fileLength;
});

/**
 * @description: 处理全选改变
 * @param {boolean} value 选中状态
 */
function handleChangeAll(value: boolean) {
  if (value) {
    selectionList.value = props.fileList.map((file) => file.name);
  } else {
    selectionList.value = [];
  }
}
</script>
