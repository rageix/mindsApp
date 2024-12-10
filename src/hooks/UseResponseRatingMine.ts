import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IResponseRating } from '@/types/ResponseRating';
import { postApiResponseRatingsFindMine } from '@/requests/api/responseRatings/findMine';
import { OKResponse } from "@/types/OKResponse";

export default function useResponseRatingMine(_id: MongoId, teamId: MongoId) {
  const [data, setData] = useState<IHasId<IResponseRating> | OKResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/responseRatings/findMine', _id, teamId],
    queryFn: () => {
      setLoading(true);
      return postApiResponseRatingsFindMine({ _id, teamId });
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

  return { data, query, initLoad, loading };
}
