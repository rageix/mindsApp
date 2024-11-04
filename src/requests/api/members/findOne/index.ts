import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IMemberFindRequest } from './schema';
import { IMember } from '@/types/Member';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/findOne';

export async function postApiMembersFindOne(
  arg: IMemberFindRequest,
): Promise<IHasId<IMember> | null> {
  return await postJson<IMemberFindRequest, IHasId<IMember>>(url, arg);
}
