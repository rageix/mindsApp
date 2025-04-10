import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IIdeaBoardFilter } from '@/requests/api/ideaBoards/paginated/schema';
import { postApiIdeaBoardsPaginated } from '@/requests/api/ideaBoards/paginated';
import { deleteApiIdeaBoards } from '@/requests/api/ideaBoards';
import { IIdeaBoard } from '@/types/IdeaBoard';

export default function useIdeaBoards(filters: IIdeaBoardFilter) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IIdeaBoard>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/ideaBoards/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiIdeaBoardsPaginated(filters);
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

  async function deleteItems(ids: MongoId[]) {
    await deleteApiIdeaBoards({ ids });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
