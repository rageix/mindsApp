import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest, IGroupChatPost } from './schema';
import { IGroupChat } from '@/types/GroupChat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/groupChats';

export async function postApiGroupChats(
  arg: IGroupChatPost,
): Promise<IGroupChat | null> {
  return await postJson<IGroupChatPost, IGroupChat>(url, arg);
}

export async function deleteApiChats(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
