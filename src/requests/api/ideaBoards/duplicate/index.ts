import { postJson } from '@/util/Requests';
import { IDuplicate } from '@/requests/api/ideaBoards/duplicate/schema';
import { IIdeaBoard } from '@/types/IdeaBoard';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/ideaBoards/duplicate';

export async function postApiIdeaBoardsDuplicate(
  arg: IDuplicate,
): Promise<IIdeaBoard | null> {
  return await postJson<IDuplicate, IIdeaBoard>(url, arg);
}
