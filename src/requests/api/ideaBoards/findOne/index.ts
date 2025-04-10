import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { IIdeaBoardsFindOne } from '@/requests/api/ideaBoards/findOne/schema';
import { IIdeaBoard } from '@/types/IdeaBoard';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/ideaBoards/findOne';

export async function postApiIdeaBoardsFindOne(
  arg: IIdeaBoardsFindOne,
): Promise<IHasId<IIdeaBoard> | null> {
  return await postJson<IIdeaBoardsFindOne, IHasId<IIdeaBoard>>(url, arg);
}
