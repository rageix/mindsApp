import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { deleteApiIdeaBoards } from '@/requests/api/ideaBoards';
import { IChat } from '@/types/Chat';
import { postApiChatsPaginated } from '@/requests/api/chats/paginated';
import { IChatPaginatedFilter } from '@/requests/api/chats/paginated/schema';

export default function useChats(filters: IChatPaginatedFilter) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IChat>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/chats/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiChatsPaginated(filters);
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
