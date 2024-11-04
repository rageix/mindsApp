import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest } from './schema';
import { IProfile } from '@/types/Profile';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/profiles';

export async function postApiProfiles(
  arg: IProfile,
): Promise<IHasId<IProfile> | null> {
  return await postJson<IProfile, IHasId<IProfile>>(url, arg);
}

export async function deleteApiProfiles(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
