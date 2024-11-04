import { getJson } from '@/util/Requests';
import { IUserCurrentTeamsMemberRequest } from './schema';
import { IMember } from '@/types/Member';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current/teams/member';

export async function getApiUserCurrentTeamsMember(
  arg: IUserCurrentTeamsMemberRequest,
): Promise<IHasId<IMember> | null> {
  return await getJson<IHasId<IMember>>(url + '/' + arg.teamId);
}
