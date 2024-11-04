import { postJson } from '@/util/Requests';
import { IUserPasswordResetRequest } from './Schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/passwordReset';

export async function postApiUserPasswordReset(
  arg: IUserPasswordResetRequest,
): Promise<{} | null> {
  return await postJson<IUserPasswordResetRequest, {}>(url, arg);
}
