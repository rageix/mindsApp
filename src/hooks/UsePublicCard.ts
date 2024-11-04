import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { postApiCardsFindOne } from '@/requests/api/cards/findOne';
import { ICard } from '@/types/Card';

export default function useCard(_id: MongoId | undefined, teamId: MongoId) {
  const [data, setData] = useState<IHasId<ICard>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/cards/public/findOne', _id, teamId],
    queryFn:
      _id && _id !== 'new'
        ? () => {
            setLoading(true);
            return postApiCardsFindOne({ _id, teamId });
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
