import { getJson } from '@/util/Requests';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/user/logout';

export async function getApiUserLogout(): Promise<unknown> {
  return await getJson<unknown>(url);
}
