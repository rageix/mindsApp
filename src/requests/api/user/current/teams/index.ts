import { getJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ITeam } from '@/types/Team';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current/teams';

export async function getApiUserCurrentTeams(): Promise<
  IHasId<ITeam>[] | null
> {
  return await getJson<IHasId<ITeam>[]>(url);
}
