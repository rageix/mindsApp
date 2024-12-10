import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IResponseRatingsFindMineRequest } from './schema';
import { IResponseRating } from '@/types/ResponseRating';
import { OKResponse } from "@/types/OKResponse";

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/responseRatings/findMine';

export async function postApiResponseRatingsFindMine(
  arg: IResponseRatingsFindMineRequest,
): Promise<(IHasId<IResponseRating> | OKResponse) | null> {
  return await postJson<
    IResponseRatingsFindMineRequest,
    IHasId<IResponseRating> | OKResponse
  >(url, arg);
}
