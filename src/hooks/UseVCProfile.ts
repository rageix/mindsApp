import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { getApiCardsPublic } from '../requests/api/vc/public';
import { IProfile } from '@/types/Profile';

export default function useVCProfile(_id: MongoId) {
  const [data, setData] = useState<IHasId<IProfile>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/vc/profile', _id],
    queryFn: () => {
      setLoading(true);
      return getApiCardsPublic({ _id });
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
