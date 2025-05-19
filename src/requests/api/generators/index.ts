import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';
import { IGenerator, IGeneratorInput } from '@/types/Generator';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/generators';

export async function postApiGenerators(
  arg: IGeneratorInput,
): Promise<IGenerator | null> {
  return await postJson<IGeneratorInput, IGenerator>(url, arg);
}

export async function deleteApiGenerators(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
