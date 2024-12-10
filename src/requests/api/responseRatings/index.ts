import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest, IResponseRatingRequest } from './schema';
import { IResponseRating } from '@/types/ResponseRating';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responseRatings';

export async function postApiResponseRatings(
  arg: IResponseRatingRequest,
): Promise<IHasId<IResponseRating> | null> {
  return await postJson<IResponseRatingRequest, IHasId<IResponseRating>>(
    url,
    arg,
  );
}

export async function deleteApiResponseRatings(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
