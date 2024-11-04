import { postJson } from '@/util/Requests';
import { IUserCurrentPasswordUpdateRequest } from './Schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current/password';

export async function postApiUserCurrentPassword(
  arg: IUserCurrentPasswordUpdateRequest,
): Promise<null> {
  return await postJson<IUserCurrentPasswordUpdateRequest, null>(url, arg);
}
