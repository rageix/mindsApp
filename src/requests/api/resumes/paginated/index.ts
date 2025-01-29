import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IResume } from '@/types/Resume';
import { IResumesFilter } from '@/requests/api/resumes/paginated/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/paginated';

export async function postApiResumesPaginated(
  arg: IResumesFilter,
): Promise<IPaginatedResponse<IHasId<IResume>> | null> {
  return await postJson<IResumesFilter, IPaginatedResponse<IHasId<IResume>>>(
    url,
    arg,
  );
}
