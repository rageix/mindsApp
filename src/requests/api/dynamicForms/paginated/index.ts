import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IDynamicFormFilter } from '@/requests/api/dynamicForms/paginated/schema';
import { IDynamicForm } from '@/types/DynamicForm';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/dynamicForms/paginated';

export async function postApiDynamicFormsPaginated(
  arg: IDynamicFormFilter,
): Promise<IPaginatedResponse<IHasId<IDynamicForm>> | null> {
  return await postJson<
    IDynamicFormFilter,
    IPaginatedResponse<IHasId<IDynamicForm>>
  >(url, arg);
}
