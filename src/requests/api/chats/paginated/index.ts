import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IChatPaginatedFilter } from '@/requests/api/chats/paginated/schema';
import { IChat } from '@/types/Chat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/chats/paginated';

export async function postApiChatsPaginated(
  arg: IChatPaginatedFilter,
): Promise<IPaginatedResponse<IHasId<IChat>> | null> {
  return await postJson<
    IChatPaginatedFilter,
    IPaginatedResponse<IHasId<IChat>>
  >(url, arg);
}
