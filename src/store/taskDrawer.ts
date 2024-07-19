import { createFile, getResourceFlag } from '@/api/overview';
import { putFile, multipartUpload } from '@/utils/oss';
import { getFileHash } from '@/utils/utils';
import { defineStore } from 'pinia';
import type { UploadCallbackResponseBody } from 'types/src/api/overview';
import type { UploadList } from 'types/src/store/taskDrawer';

export const useTaskDrawerStore = defineStore('taskDrawer', () => {
  const visible = ref<boolean>(false); // 显示任务抽屉
  const uploadList = ref<UploadList>([]); // 上传列表
  const downloadList = ref<UploadList>([]); // 下载列表
  const taskCount = computed(
    () => uploadList.value.filter((item) => item.state === 'upload').length
  ); // 任务总数

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
  function upload(folderPath: string, files: File[], callback: () => void) {
    const list: UploadList = files.map((file) => ({ file, state: 'upload', progress: 0 }));
    const handleSuccess = (index: number) => {
      uploadList.value[index].state = 'success';
      callback();
    };

    list.forEach(async (item, index) => {
      const hash = await getFileHash(item.file);
      const res =
        { data: undefined } ||
        (await getResourceFlag({ fileHash: hash, fileSize: item.file.size }));

      if (res.data) {
        createFile({
          folderPath,
          filename: item.file.name,
          resourceFlag: res.data
        }).then(() => handleSuccess(index));
        return;
      }

      const result = await multipartUpload(item.file, hash);

      createFile({
        folderPath,
        filename: item.file.name,
        resourceFlag: (result.data as UploadCallbackResponseBody).data.resourceFlag
      }).then(() => handleSuccess(index));
    });

    uploadList.value.unshift(...list);
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
