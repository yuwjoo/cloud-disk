import type { Ref } from 'vue';
import { addUploadTask } from '@/utils/uploadManager';

export function useUpload(currentFolderPath: Ref<string>, getFileList: () => void) {
  const uploadRef = ref<HTMLInputElement | null>(null); // 上传 input ref

  /**
   * @description: 选择文件
   */
  function selectFile() {
    uploadRef.value?.removeAttribute('webkitdirectory');
    uploadRef.value?.click();
  }

  /**
   * @description: 选择文件夹
   */
  function selectFolder() {
    uploadRef.value?.setAttribute('webkitdirectory', 'webkitdirectory');
    uploadRef.value?.click();
  }

  /**
   * @description: 上传文件
   */
  function uploadFile() {
    for (const file of uploadRef.value!.files || []) {
      addUploadTask({
        file,
        uploadName: file.name,
        uploadPath: currentFolderPath.value,
        onSuccess: () => getFileList()
      });
    }
    uploadRef.value!.value = '';
  }

  /**
   * @description: 处理指令
   * @param {string} command 指令
   */
  function handleCommand(command: string) {
    if (command === 'uploadFolder') {
      selectFolder();
    } else {
      selectFile();
    }
  }

  return { uploadRef, selectFile, selectFolder, uploadFile, handleCommand };
}
