import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IResponseRatingFindOneRequest } from './schema';
import { IResponseRating } from '@/types/ResponseRating';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responseRatings/findOne';

export async function postApiResponseRatingsFindOne(
  arg: IResponseRatingFindOneRequest,
): Promise<IHasId<IResponseRating> | null> {
  return await postJson<IResponseRatingFindOneRequest, IHasId<IResponseRating>>(
    url,
    arg,
  );
}
