/**
 * @description: 获取文件hash
 * @param {File} file 文件
 * @return {Promise<string>} 文件hash
 */
export function getFileHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const buffer = e.target?.result;

      if (!buffer) {
        reject(new Error('读取失败'));
        return;
      }

      crypto.subtle
        .digest('SHA-256', buffer as ArrayBuffer)
        .then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
          resolve(hashHex);
        })
        .catch((error) => {
          reject(error);
        });
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}
