import { ILoginVerifyRequest, ILoginVerifyResponse } from './Schema';
import { postJson } from '@/util/Requests';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/login/verify';

export async function postApiUserLoginVerify(
  arg: ILoginVerifyRequest,
): Promise<ILoginVerifyResponse | null> {
  return await postJson<ILoginVerifyRequest, ILoginVerifyResponse>(url, arg);
}
