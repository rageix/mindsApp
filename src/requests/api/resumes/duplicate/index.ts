import { postJson } from '@/util/Requests';
import {
  IResumesCreateResponse,
  IResumesDuplicate,
} from '@/requests/api/resumes/duplicate/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/duplicate';

export async function postApiResumesDuplicate(
  arg: IResumesDuplicate,
): Promise<IResumesCreateResponse | null> {
  return await postJson<IResumesDuplicate, IResumesCreateResponse>(url, arg);
}
