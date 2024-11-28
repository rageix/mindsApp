import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IForm } from '@/types/Form';
import { postApiFormsFindOne } from "@/requests/api/forms/findOne";

export default function useForm(
  _id: MongoId | undefined,
  teamId: MongoId,
) {
  const [data, setData] = useState<IHasId<IForm>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/forms/findOne', _id, teamId],
    queryFn:
      _id && _id !== 'new'
        ? () => {
            setLoading(true);
            return postApiFormsFindOne({ _id, teamId });
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
