import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDynamicFormsFindRequest } from './schema';
import { IDynamicForm } from '@/types/DynamicForm';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/dynamicForms/findOne';

export async function postApiDynamicFormsFindOne(
  arg: IDynamicFormsFindRequest,
): Promise<IHasId<IDynamicForm> | null> {
  return await postJson<IDynamicFormsFindRequest, IHasId<IDynamicForm>>(
    url,
    arg,
  );
}
