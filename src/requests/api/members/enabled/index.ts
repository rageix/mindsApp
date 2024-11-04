import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IMembersEnabledRequest } from './schema';
import { IMember } from '@/types/Member';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/enabled';

export async function postApiMembersEnabled(
  arg: IMembersEnabledRequest,
): Promise<IHasId<IMember> | null> {
  return await postJson<IMembersEnabledRequest, IHasId<IMember>>(url, arg);
}
