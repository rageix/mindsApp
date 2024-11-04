import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { postApiCardsPaginated } from '@/requests/api/cards/paginated';
import { ICard } from '@/types/Card';
import { ICardsFilters } from '@/requests/api/cards/paginated/schema';
import { deleteApiCards } from '@/requests/api/cards';

export default function useCards(filters: ICardsFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<ICard>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/cards/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiCardsPaginated(filters);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
      setInitLoad(true);
      setLoading(false);
    }
  }, [query.data]);

  async function deleteItems(ids: MongoId[], teamId: MongoId) {
    await deleteApiCards({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
