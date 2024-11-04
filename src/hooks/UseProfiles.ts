import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { IProfile } from '@/types/Profile';
import { postApiProfilesPaginated } from '@/requests/api/profiles/paginated';
import { deleteApiProfiles } from '@/requests/api/profiles';

export default function useProfiles(filters: IInvitesFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IProfile>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/profiles/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiProfilesPaginated(filters);
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
    await deleteApiProfiles({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
