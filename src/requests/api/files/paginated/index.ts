import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IFilesFilters } from '@/requests/api/files/paginated/schema';
import { IFile } from '@/types/File';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/files/paginated';

export async function postApiFilesPaginated(
  arg: IFilesFilters,
): Promise<IPaginatedResponse<IHasId<IFile>> | null> {
  return await postJson<IFilesFilters, IPaginatedResponse<IHasId<IFile>>>(
    url,
    arg,
  );
}
