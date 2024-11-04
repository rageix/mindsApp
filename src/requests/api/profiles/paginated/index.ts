import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { IProfile } from '@/types/Profile';
import { IProfilesFilters } from '@/requests/api/profiles/paginated/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/profiles/paginated';

export async function postApiProfilesPaginated(
  arg: IProfilesFilters,
): Promise<IPaginatedResponse<IHasId<IProfile>> | null> {
  return await postJson<IInvitesFilters, IPaginatedResponse<IHasId<IProfile>>>(
    url,
    arg,
  );
}
