import { postJson } from '@/util/Requests';
import { IGroupChatsMessagePost } from './schema';
import { IHasId } from '@/types/HasId';
import { OKResponse } from '@/types/OKResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/groupChats/message';

export async function postApiGroupsChatMessage(
  arg: IGroupChatsMessagePost,
): Promise<IHasId<OKResponse> | null> {
  return await postJson<IGroupChatsMessagePost, IHasId<OKResponse>>(url, arg);
}
