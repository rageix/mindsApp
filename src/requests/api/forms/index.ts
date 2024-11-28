import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest } from './schema';
import { IForm } from '@/types/Form';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/forms';

export async function postApiForms(
  arg: IForm,
): Promise<IHasId<IForm> | null> {
  return await postJson<IForm, IHasId<IForm>>(url, arg);
}

export async function deleteApiForms(
  arg: IDeleteRequest,
): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
