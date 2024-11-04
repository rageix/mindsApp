import { deleteJson, postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IDeleteRequest } from './schema';
import { ICard } from '@/types/Card';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/cards';

export async function postApiCards(arg: ICard): Promise<IHasId<ICard> | null> {
  return await postJson<ICard, IHasId<ICard>>(url, arg);
}

export async function deleteApiCards(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
