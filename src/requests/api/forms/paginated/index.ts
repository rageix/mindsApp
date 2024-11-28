import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IForm } from '@/types/Form';
import { IFormFilter } from '@/requests/api/forms/paginated/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/forms/paginated';

export async function postApiFormsPaginated(
  arg: IFormFilter,
): Promise<IPaginatedResponse<IHasId<IForm>> | null> {
  return await postJson<IFormFilter, IPaginatedResponse<IHasId<IForm>>>(
    url,
    arg,
  );
}
