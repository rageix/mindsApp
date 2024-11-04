import { ILoginRequest, ILoginResponse } from './Schema';
import { postJson } from '@/util/Requests';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/login';

export async function postApiUserLogin(
  arg: ILoginRequest,
): Promise<ILoginResponse | null> {
  return await postJson<ILoginRequest, ILoginResponse>(url, arg);
}
