import { deleteJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from './schema';
import { IIdeaBoard } from '@/types/IdeaBoard';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/ideaBoards';

export async function postApiIdeaBoards(
  arg: IIdeaBoard,
): Promise<IIdeaBoard | null> {
  return await postJson<IIdeaBoard, IIdeaBoard>(url, arg);
}

export async function deleteApiIdeaBoards(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
