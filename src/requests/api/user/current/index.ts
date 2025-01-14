import { getJson, postJson } from '@/util/Requests';
import { IUserProfileProfileUpdateRequest } from './Schema';
import { IUserCurrentResponse } from '@/types/UserCurrent';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current';

export async function getApiUserCurrent(): Promise<IUserCurrentResponse | null> {
  return await getJson<IUserCurrentResponse>(url);
}

export async function postApiUserCurrent(
  arg: IUserProfileProfileUpdateRequest,
): Promise<null> {
  return await postJson<IUserProfileProfileUpdateRequest, null>(url, arg);
}
