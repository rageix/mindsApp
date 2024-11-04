import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IProfile } from '@/types/Profile';
import { postApiProfilesFindOne } from '@/requests/api/profiles/findOne';

export default function useProfile(_id: MongoId | undefined, teamId: MongoId) {
  const [data, setData] = useState<IHasId<IProfile>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/profiles/findOne', _id, teamId],
    queryFn:
      _id && _id !== 'new'
        ? () => {
            setLoading(true);
            return postApiProfilesFindOne({ _id, teamId });
          }
        : () => null,
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
