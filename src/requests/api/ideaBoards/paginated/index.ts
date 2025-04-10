import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { IIdeaBoardFilter } from '@/requests/api/ideaBoards/paginated/schema';
import { IIdeaBoard } from '@/types/IdeaBoard';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/ideaBoards/paginated';

export async function postApiIdeaBoardsPaginated(
  arg: IIdeaBoardFilter,
): Promise<IPaginatedResponse<IHasId<IIdeaBoard>> | null> {
  return await postJson<
    IIdeaBoardFilter,
    IPaginatedResponse<IHasId<IIdeaBoard>>
  >(url, arg);
}
