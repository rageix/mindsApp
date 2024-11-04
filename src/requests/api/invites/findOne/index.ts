import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IInviteFindRequest } from './schema';
import { IInvite } from '@/types/Invite';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/invites/findOne';

export async function postApiInvitesFindOne(
  arg: IInviteFindRequest,
): Promise<IHasId<IInvite> | null> {
  return await postJson<IInviteFindRequest, IHasId<IInvite>>(url, arg);
}
