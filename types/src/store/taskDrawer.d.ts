export type UploadList = {
  file: File;
  state: 'upload' | 'success' | 'error';
  progress: number;
}[];
