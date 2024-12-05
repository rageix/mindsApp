import { getJson, postJson } from '@/util/Requests';
import { MongoId } from '@/types/MongoDocument';
import { IForm } from '@/types/Form';
import { IHasId } from '@/types/HasId';
import { OKResponse } from '@/types/OKResponse';
import { IFormPublicRequest } from '@/types/FormPublicRequest';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/forms/public';

export async function getApiFormsPublic(
  _id: MongoId,
): Promise<IHasId<IForm> | null> {
  return await getJson<IHasId<IForm>>(url + '/' + String(_id));
}

export async function postApiFormsPublic(
  arg: IFormPublicRequest,
): Promise<OKResponse | null> {
  return await postJson<IFormPublicRequest, OKResponse>(url, arg);
}
