import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IResumesFindOne } from '@/requests/api/resumes/findOne/schema';
import { IResume } from '@/types/Resume';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/findOne';

export async function postApiResumesFindOne(
  arg: IResumesFindOne,
): Promise<IHasId<IResume> | null> {
  return await postJson<IResumesFindOne, IHasId<IResume>>(url, arg);
}
