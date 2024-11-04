import { postJson } from '@/util/Requests';
import { IProjectFilters } from '@/requests/api/projects/paginated/schema';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IProject } from '@/types/Project';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/projects/paginated';

export async function postApiProjectsPaginated(
  arg: IProjectFilters,
): Promise<IPaginatedResponse<IHasId<IProject>> | null> {
  return await postJson<IProjectFilters, IPaginatedResponse<IHasId<IProject>>>(
    url,
    arg,
  );
}
