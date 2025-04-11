import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';
import { IIdeaBoard } from '@/types/IdeaBoard';
import { IIdResponse } from '@/types/IdResponse';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/ideaBoards';

export async function postApiIdeaBoards(
  arg: IIdeaBoard,
): Promise<IIdResponse | null> {
  return await postJson<IIdeaBoard, IIdResponse>(url, arg);
}

export async function deleteApiIdeaBoards(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
