import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IMember } from '@/types/Member';
import { IMemberFilters } from '@/requests/api/members/paginated/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/paginated';

export async function postApiMembersPaginated(
  arg: IMemberFilters,
): Promise<IPaginatedResponse<IHasId<IMember>> | null> {
  return await postJson<IMemberFilters, IPaginatedResponse<IHasId<IMember>>>(
    url,
    arg,
  );
}
