import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IFormResponsesFilter } from '@/requests/api/formResponses/paginated/schema';
import { IFormResponse } from '@/types/FormResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/formResponses/paginated';

export async function postApiFormResponsesPaginated(
  arg: IFormResponsesFilter,
): Promise<IPaginatedResponse<IHasId<IFormResponse>> | null> {
  return await postJson<
    IFormResponsesFilter,
    IPaginatedResponse<IHasId<IFormResponse>>
  >(url, arg);
}
