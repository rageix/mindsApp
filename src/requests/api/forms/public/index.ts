import { getJson } from '@/util/Requests';
import { MongoId } from '@/types/MongoDocument';
import { IForm } from '@/types/Form';
import { IHasId } from "@/types/HasId";

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/forms/public';

export async function getApiFormsPublic(_id: MongoId): Promise<IHasId<IForm> | null> {
  return await getJson<IHasId<IForm>>(url + '/' + String(_id));
}
