import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IProfileFindRequest } from './schema';
import { IProfile } from '@/types/Profile';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/profiles/findOne';

export async function postApiProfilesFindOne(
  arg: IProfileFindRequest,
): Promise<IHasId<IProfile> | null> {
  return await postJson<IProfileFindRequest, IHasId<IProfile>>(url, arg);
}
