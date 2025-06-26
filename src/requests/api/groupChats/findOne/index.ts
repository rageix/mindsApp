import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IGroupChatsFindOne } from '@/requests/api/groupChats/findOne/schema';
import { IGroupChat } from '@/types/GroupChat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/groupChats/findOne';

export async function postApiGroupChatsFindOne(
  arg: IGroupChatsFindOne,
): Promise<IHasId<IGroupChat> | null> {
  return await postJson<IGroupChatsFindOne, IHasId<IGroupChat>>(url, arg);
}
