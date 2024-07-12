import { defineStore } from 'pinia';

export const useTaskDrawerStore = defineStore('taskDrawer', () => {
  const visible = ref<boolean>(false); // 显示任务抽屉
  const uploadList = ref<string[]>([]); // 上传列表
  const downloadList = ref<string[]>([]); // 下载列表
  const taskCount = computed(() => uploadList.value.length + downloadList.value.length); // 任务总数

  /**
   * @description: 打开抽屉
   */
  function open() {
    visible.value = true;
  }

  /**
   * @description: 关闭抽屉
   */
  function close() {
    visible.value = false;
  }

  /**
   * @description: 上传
   * @param {File[]} files 文件列表
   */
  function upload(files: File[]) {
    console.log('开始上传', files);
  }

  /**
   * @description: 下载
   * @param {string[]} urls 链接列表
   */
  function download(urls: string[]) {
    console.log('开始下载', urls);
  }

  return { visible, uploadList, downloadList, taskCount, open, close, upload, download };
});
