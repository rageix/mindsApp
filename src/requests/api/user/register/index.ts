import { postJson } from '@/util/Requests';
import { IRegisterRequest, IRegisterResponse } from './Schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/register';

export async function postApiUserRegister(
  arg: IRegisterRequest,
): Promise<IRegisterResponse | null> {
  return await postJson<IRegisterRequest, IRegisterResponse>(url, arg);
}
