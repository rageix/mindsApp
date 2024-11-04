import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IInvite } from '@/types/Invite';
import { IDeleteRequest } from '@/requests/api/invites/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/invites';

export async function postApiInvites(
  arg: IInvite,
): Promise<IHasId<IInvite> | null> {
  return await postJson<IInvite, IHasId<IInvite>>(url, arg);
}

export async function deleteApiInvites(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
