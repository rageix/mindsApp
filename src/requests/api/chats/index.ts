import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';
import { IIdResponse } from '@/types/IdResponse';
import { IChat } from '@/types/Chat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/chats';

export async function postApiChats(arg: IChat): Promise<IIdResponse | null> {
  return await postJson<IChat, IIdResponse>(url, arg);
}

export async function deleteApiChats(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
