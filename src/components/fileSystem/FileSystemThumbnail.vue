<template>
  <div class="m-l--5">
    <div
      v-for="(file, index) in fileList"
      class="inline-block m-l-5 m-b-5 p-2 w-30 box-border cursor-pointer hover:bg-gray-100 rounded-md"
      :key="index"
    >
      <input type="checkbox" />
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
  </div>
</template>

<script setup lang="ts">
defineProps({
  fileList: {
    type: Array as PropType<{ name: string; type: string }[]>,
    default: () => [
      { name: '全功能运营后台', type: 'folder' },
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
</script>
