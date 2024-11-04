import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ICardsFindRequest } from './schema';
import { ICard } from '@/types/Card';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/cards/findOne';

export async function postApiCardsFindOne(
  arg: ICardsFindRequest,
): Promise<IHasId<ICard> | null> {
  return await postJson<ICardsFindRequest, IHasId<ICard>>(url, arg);
}
