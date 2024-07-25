import axios from 'axios';
import { concurrentRequestAll } from '@/utils/concurrentRequest';
import type { MultipartUploadReqParams, MultipartUploadResData } from 'types/src/api/upload';
import { getMultipart } from './base';

export async function multipartUpload(
  params: MultipartUploadReqParams
): Promise<MultipartUploadResData> {
  const eTags: string[] = []; // 分片eTag列表
  let submitMultipartUrl = params.submitMultipartUrl;

  const createUpload = async (url: string, partNumber: number) => {
    const res = await axios({
      url,
      method: 'put',
      data: params.file.slice((partNumber - 1) * params.partSize, partNumber * params.partSize),
      headers: {
        'Content-Type': params.file.type || 'application/octet-stream'
      }
    });
    eTags[partNumber - 1] = res.headers['etag'];
  };
  const concurrentRequest = concurrentRequestAll(
    params.multipartUrls.map(({ url, partNumber }) => createUpload.bind(null, url, partNumber)),
    { retry: 5 }
  );
  const addNextRequest = (url?: string) => {
    if (!url) return;
    const nextRequest = async () => {
      const res = await getMultipart(url);
      concurrentRequest.insertRequest(
        res.data.multipartUrls.map(({ url, partNumber }) =>
          createUpload.bind(null, url, partNumber)
        )
      );
      addNextRequest(res.data.nextMultipartUrl);
      submitMultipartUrl = res.data.submitMultipartUrl;
    };
    concurrentRequest.insertRequest([nextRequest]);
  };

  addNextRequest(params.nextMultipartUrl);

  await concurrentRequest.promise;

  console.log(eTags, submitMultipartUrl);

  return {} as any;
}
