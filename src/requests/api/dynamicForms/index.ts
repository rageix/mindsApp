import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest } from './schema';
import { IDynamicForm } from '@/types/DynamicForm';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/dynamicForms';

export async function postApiDynamicForms(
  arg: IDynamicForm,
): Promise<IHasId<IDynamicForm> | null> {
  return await postJson<IDynamicForm, IHasId<IDynamicForm>>(url, arg);
}

export async function deleteApiDynamicForms(
  arg: IDeleteRequest,
): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
