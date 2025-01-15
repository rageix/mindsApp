import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IResumeFilters } from '@/requests/api/resumes/paginated/schema';
import { IResume } from '@/types/Resume';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/resumes/paginated';

export async function postApiCardsPaginated(
  arg: IResumeFilters,
): Promise<IPaginatedResponse<IHasId<IResume>> | null> {
  return await postJson<IResumeFilters, IPaginatedResponse<IHasId<IResume>>>(
    url,
    arg,
  );
}
