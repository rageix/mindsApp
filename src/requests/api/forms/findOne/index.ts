import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDynamicFormsFindRequest } from './schema';
import { IForm } from '@/types/Form';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/forms/findOne';

export async function postApiFormsFindOne(
  arg: IDynamicFormsFindRequest,
): Promise<IHasId<IForm> | null> {
  return await postJson<IDynamicFormsFindRequest, IHasId<IForm>>(
    url,
    arg,
  );
}
