import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IFormResponse } from '@/types/FormResponse';
import { postApiFormResponsesFindOne } from '@/requests/api/formResponses/findOne';

export default function useFormResponse(_id: MongoId | undefined, teamId: MongoId) {
  const [data, setData] = useState<IHasId<IFormResponse>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/formResponses/findOne', _id, teamId],
    queryFn:
      _id && _id !== 'new'
        ? () => {
            setLoading(true);
            return postApiFormResponsesFindOne({ _id, teamId });
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
