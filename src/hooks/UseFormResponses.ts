import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import {
  IFormResponsesFilter
} from "@/requests/api/formResponses/paginated/schema";
import { IFormResponse } from "@/types/FormResponse";
import {
  postApiFormResponsesPaginated
} from "@/requests/api/formResponses/paginated";
import { deleteApiFormResponses } from "@/requests/api/formResponses";

export default function useFormResponses(filters: IFormResponsesFilter) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IFormResponse>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/formResponses/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiFormResponsesPaginated(filters);
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
    await deleteApiFormResponses({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
