import { getJson, postJson } from '@/util/Requests';
import { IUser } from '@/types/User';
import { IUserProfileProfileUpdateRequest } from './Schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current';

export async function getApiUserCurrent(): Promise<IUser | null> {
  return await getJson<IUser>(url);
}

export async function postApiUserCurrent(
  arg: IUserProfileProfileUpdateRequest,
): Promise<null> {
  return await postJson<IUserProfileProfileUpdateRequest, null>(url, arg);
}
