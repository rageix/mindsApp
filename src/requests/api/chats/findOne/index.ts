import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IChatsFindOne } from '@/requests/api/chats/findOne/schema';
import { IChat } from '@/types/Chat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/chats/findOne';

export async function postApiChatsFindOne(
  arg: IChatsFindOne,
): Promise<IHasId<IChat> | null> {
  return await postJson<IChatsFindOne, IHasId<IChat>>(url, arg);
}
