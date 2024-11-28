import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { IForm } from '@/types/Form';
import { postApiFormsPaginated } from '@/requests/api/forms/paginated';
import { deleteApiForms } from "@/requests/api/forms";

export default function useForms(filters: IInvitesFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IForm>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/forms/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiFormsPaginated(filters);
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
    await deleteApiForms({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
