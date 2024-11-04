import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { IInvite } from '@/types/Invite';
import { postApiInvitesPaginated } from '@/requests/api/invites/paginated';
import { deleteApiInvites } from '@/requests/api/invites';

export default function useInvites(filters: IInvitesFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IInvite>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/invites/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiInvitesPaginated(filters);
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
    await deleteApiInvites({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
