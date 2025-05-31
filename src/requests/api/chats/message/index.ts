import { postJson } from '@/util/Requests';
import { IChatsSoloPost } from './schema';
import { IModelResponse } from '@/types/HistoryItem';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/chats/message';

export async function postApiChatsMessage(
  arg: IChatsSoloPost,
): Promise<IHasId<IModelResponse> | null> {
  return await postJson<IChatsSoloPost, IHasId<IModelResponse>>(url, arg);
}
