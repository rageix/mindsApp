import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IResponsesPaginatedFilter } from '@/requests/api/responses/paginated/schema';
import { IModelResponse } from '@/types/HistoryItem';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responses/paginated';

export async function postApiResponsesPaginated(
  arg: IResponsesPaginatedFilter,
): Promise<IPaginatedResponse<IHasId<IModelResponse>> | null> {
  return await postJson<
    IResponsesPaginatedFilter,
    IPaginatedResponse<IHasId<IModelResponse>>
  >(url, arg);
}
