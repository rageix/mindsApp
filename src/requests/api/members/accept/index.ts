import { getJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IInviteAcceptParams } from '@/requests/api/invites/accept/schema';
import { OKResponse } from '@/types/OKResponse';
import { IMember } from '@/types/Member';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/accept';

export async function getApiMembersAccept(
  _id: MongoId,
): Promise<IHasId<IMember> | null> {
  return await getJson<IHasId<IMember>>(url + '/' + String(_id));
}

export async function postApiMembersAccept(
  arg: IInviteAcceptParams,
): Promise<OKResponse | null> {
  return await postJson<IInviteAcceptParams, OKResponse>(url, arg);
}
