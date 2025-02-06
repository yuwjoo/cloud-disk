import SparkMD5 from 'spark-md5';

export type MessageEvent = {
  data: {
    targetFile: File;
    baseChunkSize: number;
  };
};

export type PostMessageData = string;

self.onmessage = async (e: MessageEvent) => {
  const { targetFile, baseChunkSize } = e.data;
  const fileHash = await computeFileHash(targetFile, baseChunkSize || 100);
  self.postMessage(fileHash);
};

/**
 * 将目标文件分片 并 计算文件Hash
 * @param {File} targetFile 目标上传文件
 * @param {number} baseChunkSize 上传分块大小，单位Mb
 * @returns {Promise<string>} 文件hash
 */
async function computeFileHash(targetFile: File, baseChunkSize: number = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    //初始化分片方法，兼容问题
    const blobSlice =
      File.prototype.slice ||
      (File.prototype as any).mozSlice ||
      (File.prototype as any).webkitSlice;
    //分片大小 baseChunkSize Mb
    const chunkSize = baseChunkSize * 1024 * 1024;
    //目标分片数
    const targetChunkCount = targetFile && Math.ceil(targetFile.size / chunkSize);
    //当前已执行分块数
    let currentChunkCount = 0;
    //创建sparkMD5对象
    const spark = new SparkMD5.ArrayBuffer();
    //创建文件读取对象
    const fileReader = new FileReader();

    //FilerReader onload事件
    fileReader.onload = (e) => {
      currentChunkCount++;
      //将当前分块追加到spark对象中
      spark.append(e.target!.result as ArrayBuffer);
      //判断分块是否全部读取成功
      if (currentChunkCount >= targetChunkCount) {
        //全部读取，获取文件hash
        resolve(spark.end());
      } else {
        loadNext();
      }
    };

    //FilerReader onerror事件
    fileReader.onerror = () => {
      reject();
    };

    //读取下一个分块
    const loadNext = () => {
      //计算分片的起始位置和终止位置
      const start = chunkSize * currentChunkCount;
      const end = Math.min(start + chunkSize, targetFile.size);
      //读取文件，触发onLoad
      fileReader.readAsArrayBuffer(blobSlice.call(targetFile, start, end));
    };

    loadNext();
  });
}
