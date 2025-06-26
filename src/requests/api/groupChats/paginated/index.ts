import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IGroupChatPaginatedFilter } from '@/requests/api/groupChats/paginated/schema';
import { IGroupChat } from '@/types/GroupChat';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/groupChats/paginated';

export async function postApiChatsPaginated(
  arg: IGroupChatPaginatedFilter,
): Promise<IPaginatedResponse<IHasId<IGroupChat>> | null> {
  return await postJson<
    IGroupChatPaginatedFilter,
    IPaginatedResponse<IHasId<IGroupChat>>
  >(url, arg);
}
