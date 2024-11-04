import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IProject } from '@/types/Project';
import { MongoId } from '@/types/MongoDocument';
import { getApiProjectsId } from '@/requests/api/projects';

export default function useProject(_id: MongoId | undefined) {
  const [data, setData] = useState<IHasId<IProject>>();

  const query = useQuery({
    queryKey: ['/api/projects/:_id', _id],
    queryFn: _id ? () => getApiProjectsId(_id) : undefined,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
    }
  }, [query.data]);

  return { data, query };
}
