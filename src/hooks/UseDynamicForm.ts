import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { postApiDynamicFormsFindOne } from '@/requests/api/dynamicForms/findOne';
import { IDynamicForm } from '@/types/DynamicForm';

export default function useDynamicForm(
  _id: MongoId | undefined,
  teamId: MongoId,
) {
  const [data, setData] = useState<IHasId<IDynamicForm>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/dynamicForms/findOne', _id, teamId],
    queryFn:
      _id && _id !== 'new'
        ? () => {
            setLoading(true);
            return postApiDynamicFormsFindOne({ _id, teamId });
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
