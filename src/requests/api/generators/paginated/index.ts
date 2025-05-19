import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IGeneratorPaginatedFilter } from '@/requests/api/generators/paginated/schema';
import { IGenerator } from '@/types/Generator';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/generators/paginated';

export async function postApiChatsPaginated(
  arg: IGeneratorPaginatedFilter,
): Promise<IPaginatedResponse<IHasId<IGenerator>> | null> {
  return await postJson<
    IGeneratorPaginatedFilter,
    IPaginatedResponse<IHasId<IGenerator>>
  >(url, arg);
}
