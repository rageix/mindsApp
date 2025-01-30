import { postJson } from '@/util/Requests';
import { IResumesCreateResponse } from './schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/create';

export async function postApiResumesCreate(): Promise<IResumesCreateResponse | null> {
  return await postJson<{}, IResumesCreateResponse>(url, {});
}
