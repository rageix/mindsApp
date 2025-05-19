import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IGeneratorsFindOne } from '@/requests/api/generators/findOne/schema';
import { IGenerator } from '@/types/Generator';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/generators/findOne';

export async function postApiChatsFindOne(
  arg: IGeneratorsFindOne,
): Promise<IHasId<IGenerator> | null> {
  return await postJson<IGeneratorsFindOne, IHasId<IGenerator>>(url, arg);
}
