import { deleteJson, getJson } from '@/util/Requests';
import { ISession } from '@/types/Session';
import { IDeleteRequest } from '@/util/Validators';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/current/sessions';

export async function getApiUserCurrentSessions(): Promise<ISession[] | null> {
  return await getJson<ISession[]>(url);
}

export async function deleteApiUserCurrentSessions(
  arg: IDeleteRequest,
): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
