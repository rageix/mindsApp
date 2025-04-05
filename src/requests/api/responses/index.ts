import { postJson } from '@/util/Requests';
import { IResponsesPost } from './schema';
import { IModelResponse } from '@/types/HistoryItem';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responses';

export async function postApiRequests(
  arg: IResponsesPost,
): Promise<IModelResponse | null> {
  return await postJson<IResponsesPost, IModelResponse>(url, arg);
}
