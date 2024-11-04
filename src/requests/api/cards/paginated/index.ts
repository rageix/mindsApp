import { postJson } from '@/util/Requests';
import { IPaginatedResponse } from '@/types/Pagination';
import { IHasId } from '@/types/HasId';
import { ICardsFilters } from '@/requests/api/cards/paginated/schema';
import { ICard } from '@/types/Card';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/cards/paginated';

export async function postApiCardsPaginated(
  arg: ICardsFilters,
): Promise<IPaginatedResponse<IHasId<ICard>> | null> {
  return await postJson<ICardsFilters, IPaginatedResponse<IHasId<ICard>>>(
    url,
    arg,
  );
}
