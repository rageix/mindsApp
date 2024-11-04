import { getJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ICardsPublicRequest } from './schema';
import { IProfile } from '@/types/Profile';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/vc/profile';

export async function getApiCardsPublic(
  arg: ICardsPublicRequest,
): Promise<IHasId<IProfile> | null> {
  return await getJson<IHasId<IProfile>>(url + '/' + String(arg._id));
}
