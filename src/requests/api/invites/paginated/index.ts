import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { IInvite } from '@/types/Invite';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/invites/paginated';

export async function postApiInvitesPaginated(
  arg: IInvitesFilters,
): Promise<IPaginatedResponse<IHasId<IInvite>> | null> {
  return await postJson<IInvitesFilters, IPaginatedResponse<IHasId<IInvite>>>(
    url,
    arg,
  );
}
