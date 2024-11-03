import { UploadTask, type UploadTaskStatus } from './uploadTask/UploadTask';

export type AddUploadTaskOptions = {
  file: File;
  uploadPath: string;
  uploadName: string;
};

export const uploadTaskList = ref<ReturnType<typeof createUploadTask>[]>([]); // 上传列表

export const uploadTaskCount = computed(() => {
  return uploadTaskList.value.filter((item) => !['success', 'fail', 'cancel'].includes(item.status))
    .length;
}); // 正在上传的任务数

export const visible = ref<boolean>(false); // 显示任务抽屉

/**
 * @description: 添加上传任务
 * @param {AddUploadTaskOptions} options 配置
 */
export function addUploadTask(options: AddUploadTaskOptions & { onSuccess?: (res: any) => void }) {
  const uploadTask = createUploadTask(options);
  uploadTaskList.value.push(uploadTask);
  uploadTask.start();
}

/**
 * @description: 删除上传任务
 * @param {ReturnType<typeof createUploadTask>} uploadTask 上传任务
 */
export function deleteUploadTask(uploadTask: ReturnType<typeof createUploadTask>) {
  uploadTask.cancel();
  uploadTaskList.value = uploadTaskList.value.filter((item) => item !== uploadTask);
}

/**
 * @description: 创建上传任务
 * @param {AddUploadTaskOptions} options 配置
 */
function createUploadTask(options: AddUploadTaskOptions & { onSuccess?: (res: any) => void }) {
  const status = ref<UploadTaskStatus>('pausing'); // 状态
  const progress = ref<number>(0); // 进度
  const response = ref<any>(); // 响应结果
  const uploadTask = new UploadTask({
    ...options,
    onInitialize: () => {
      status.value = 'initialize';
    },
    onWaiting: () => {
      status.value = 'waiting';
    },
    onUpload: () => {
      status.value = 'uploading';
    },
    onProgress: (num) => {
      progress.value = num;
    },
    onPause: () => {
      status.value = 'pausing';
    },
    onCancel: () => {
      status.value = 'cancel';
    },
    onSuccess: (res) => {
      status.value = 'success';
      response.value = res;
      options.onSuccess?.(res);
    },
    onFail: () => {
      status.value = 'fail';
    }
  });

  return reactive({
    file: options.file,
    status,
    progress,
    response,
    start: uploadTask.start.bind(uploadTask),
    pause: uploadTask.pause.bind(uploadTask),
    cancel: uploadTask.cancel.bind(uploadTask)
  });
}
