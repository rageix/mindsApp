import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';
import { IResume } from '@/types/Resume';
import { OKResponse } from '@/types/OKResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes';

export async function postApiResumes(
  arg: IResume,
): Promise<OKResponse | null> {
  return await postJson<IResume, OKResponse>(url, arg);
}

export async function deleteApiCards(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
