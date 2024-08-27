import { createUploadTask } from './hooks/uploadTask';

export type AddUploadTaskOptions = {
  file: File;
  uploadPath: string;
  uploadName: string;
};

const MAX_TASK_NUM = 1; // 同时上传任务数
export const uploadTaskList = ref<ReturnType<typeof createUploadTask>[]>([]); // 上传列表
const uploadTaskPool = new Set(); // 上传池
const awaitUploadTaskList = ref<ReturnType<typeof createUploadTask>[]>([]); // 等待上传列表

/**
 * @description: 添加上传任务
 * @param {AddUploadTaskOptions} options 配置
 */
export function addUploadTask(options: AddUploadTaskOptions) {
  const uploadTask = createUploadTask(options);

  uploadTaskList.value.push(uploadTask);
  uploadTask.ready();
  const stopWatch = watch(
    () => uploadTask.status,
    (val) => {
      if (val === 'ready') {
        if (awaitUploadTaskList.value.find((task) => task === uploadTask)) return;
        awaitUploadTaskList.value.push(uploadTask);
        execUploadTask();
      } else {
        awaitUploadTaskList.value = awaitUploadTaskList.value.filter((task) => task !== uploadTask);
      }

      if (val === 'success' || val === 'fail' || val === 'cancel') {
        execUploadTask();
        stopWatch();
      }
    }
  );
}

/**
 * @description: 删除上传任务
 */
export function deleteUploadTask(task: ReturnType<typeof createUploadTask>) {
  task.cancel();
  uploadTaskList.value = uploadTaskList.value.filter((item) => item !== task);
  uploadTaskPool.delete(task);
  awaitUploadTaskList.value = awaitUploadTaskList.value.filter((item) => item !== task);
}

/**
 * @description: 执行上传任务
 */
function execUploadTask() {
  if (uploadTaskPool.size >= MAX_TASK_NUM) return;
  const task = awaitUploadTaskList.value.shift();
  if (!task) return;
  uploadTaskPool.add(task);
  task.start();
}
