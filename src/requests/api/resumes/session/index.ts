import { getJson } from '@/util/Requests';
import { IResumeSessionResponse } from '@/types/Resume';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/session';

export async function getApiResumesSession(): Promise<IHasId<IResumeSessionResponse> | null> {
  return await getJson<IHasId<IResumeSessionResponse>>(url);
}
