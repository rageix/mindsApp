import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IInvitesFilters } from '@/requests/api/invites/paginated/schema';
import { postApiDynamicFormsPaginated } from '@/requests/api/dynamicForms/paginated';
import { IDynamicForm } from '@/types/DynamicForm';
import { deleteApiDynamicForms } from '@/requests/api/dynamicForms';

export default function useDynamicForms(filters: IInvitesFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IDynamicForm>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/dynamicForms/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiDynamicFormsPaginated(filters);
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
    await deleteApiDynamicForms({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
