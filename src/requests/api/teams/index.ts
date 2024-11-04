import { getJson, postJson } from '@/util/Requests';
import { MongoId } from '@/types/MongoDocument';
import { IHasId } from '@/types/HasId';
import { ITeamsPostRequest } from '@/requests/api/teams/schema';
import { ITeam } from '@/types/Team';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/teams';

export async function getApiTeams(_id: MongoId): Promise<IHasId<ITeam> | null> {
  return await getJson<IHasId<ITeam>>(url + '/' + String(_id));
}

export async function postApiTeams(
  arg: ITeamsPostRequest,
): Promise<IHasId<ITeam> | null> {
  return await postJson<ITeamsPostRequest, IHasId<ITeam>>(url, arg);
}
