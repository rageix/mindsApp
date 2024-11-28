import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { getApiFormsPublic } from '@/requests/api/forms/public';
import { IForm } from '@/types/Form';

export default function useFormPublic(_id: MongoId) {
  const [data, setData] = useState<IHasId<IForm>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/forms/public', _id],
    queryFn: () => {
      setLoading(true);
      return getApiFormsPublic(_id);
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
