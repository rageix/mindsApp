import { deleteJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/formResponses';

export async function deleteApiFormResponses(
  arg: IDeleteRequest,
): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
