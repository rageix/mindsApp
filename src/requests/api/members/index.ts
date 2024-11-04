import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest, IMemberRequest } from '@/requests/api/members/schema';
import { IMember } from '@/types/Member';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members';

export async function postApiMembers(
  arg: IMemberRequest,
): Promise<IHasId<IMember> | null> {
  return await postJson<IMemberRequest, IHasId<IMember>>(url, arg);
}

export async function deleteApiMembers(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
