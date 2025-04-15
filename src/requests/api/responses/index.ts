import { postJson } from '@/util/Requests';
import { IResponsesPost } from './schema';
import { IModelResponse } from '@/types/HistoryItem';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responses';

export async function postApiRequests(
  arg: IResponsesPost,
): Promise<IHasId<IModelResponse> | null> {
  return await postJson<IResponsesPost, IHasId<IModelResponse>>(url, arg);
}
