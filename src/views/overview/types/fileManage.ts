import type { GetDirectoryListResponseBody } from 'types/src/api/overview';

export type PathList = { label: string; path: string }[];

export type FileList = GetDirectoryListResponseBody['data']['list'] &
  {
    modifiedDate: string;
  }[];
