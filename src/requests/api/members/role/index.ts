import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IMembersRoleRequest } from './schema';
import { IMember } from '@/types/Member';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/role';

export async function postApiMembersRole(
  arg: IMembersRoleRequest,
): Promise<IHasId<IMember> | null> {
  return await postJson<IMembersRoleRequest, IHasId<IMember>>(url, arg);
}
