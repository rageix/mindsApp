import { getJson } from '@/util/Requests';
import { IFileResponse } from '@/requests/api/files/schema';
import { MongoId } from '@/types/MongoDocument';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/files';

export async function getApiFiles(_id: MongoId): Promise<IFileResponse | null> {
  return await getJson<IFileResponse>(url + '/' + String(_id));
}
