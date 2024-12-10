import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IResponseRatingsFilters } from '@/requests/api/responseRatings/paginated/schema';
import { IResponseRating } from '@/types/ResponseRating';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responseRatings/paginated';

export async function postApiResponseRatingsPaginated(
  arg: IResponseRatingsFilters,
): Promise<IPaginatedResponse<IHasId<IResponseRating>> | null> {
  return await postJson<
    IResponseRatingsFilters,
    IPaginatedResponse<IHasId<IResponseRating>>
  >(url, arg);
}
