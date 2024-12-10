import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import {
  IResponseRatingsFilters
} from "@/requests/api/responseRatings/paginated/schema";
import { IResponseRating } from "@/types/ResponseRating";
import {
  postApiResponseRatingsPaginated
} from "@/requests/api/responseRatings/paginated";
import { deleteApiResponseRatings } from "@/requests/api/responseRatings";

export default function useResponseRatings(filters: IResponseRatingsFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IResponseRating>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/responseRatings/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiResponseRatingsPaginated(filters);
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
    await deleteApiResponseRatings({ ids, teamId });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
