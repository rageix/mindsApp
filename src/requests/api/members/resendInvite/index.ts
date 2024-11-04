import { postJson } from '@/util/Requests';
import { IMembersResendInviteRequest } from './schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/members/resendInvite';

export async function postApiMembersResendInvite(
  arg: IMembersResendInviteRequest,
): Promise<unknown> {
  return await postJson<IMembersResendInviteRequest, unknown>(url, arg);
}
