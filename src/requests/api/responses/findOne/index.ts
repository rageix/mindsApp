import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IModelResponse } from '@/types/HistoryItem';
import { IRequestsFindOne } from '@/requests/api/responses/findOne/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responses/findOne';

export async function postApiRequestsFindOne(
  arg: IRequestsFindOne,
): Promise<IHasId<IModelResponse> | null> {
  return await postJson<IRequestsFindOne, IHasId<IModelResponse>>(url, arg);
}
