import { getJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IInvite } from '@/types/Invite';
import { MongoId } from '@/types/MongoDocument';
import { IInviteAcceptParams } from '@/requests/api/invites/accept/schema';
import { OKResponse } from '@/types/OKResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/invites/accept';

export async function getApiInvitesAccept(
  _id: MongoId,
): Promise<IHasId<IInvite> | null> {
  return await getJson<IHasId<IInvite>>(url + '/' + String(_id));
}

export async function postApiInvitesAccept(
  arg: IInviteAcceptParams,
): Promise<OKResponse | null> {
  return await postJson<IInviteAcceptParams, OKResponse>(url, arg);
}
