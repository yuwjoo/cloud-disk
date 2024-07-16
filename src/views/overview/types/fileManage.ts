import type { GetDirectoryListResponseBody } from 'types/src/api/overview';

export type PathList = GetDirectoryListResponseBody['data']['folderPathList'];

export type FileList = GetDirectoryListResponseBody['data']['directoryList'] & {
  modifiedDate: string;
}[];
