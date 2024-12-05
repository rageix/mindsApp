import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IFormResponsesFindRequest } from './schema';
import { IFormResponse } from '@/types/FormResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/formResponses/findOne';

export async function postApiFormResponsesFindOne(
  arg: IFormResponsesFindRequest,
): Promise<IHasId<IFormResponse> | null> {
  return await postJson<IFormResponsesFindRequest, IHasId<IFormResponse>>(
    url,
    arg,
  );
}
