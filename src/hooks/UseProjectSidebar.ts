import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApiProjectsSidebar } from '@/requests/api/projects/sidebar';
import { IHasId } from '@/types/HasId';
import { IProject } from '@/types/Project';
import { projectQueryKeys } from '@/util/Projects';

export default function useProjectsSidebar() {
  const [data, setData] = useState<IHasId<IProject>[]>([]);

  const query = useQuery({
    queryKey: [projectQueryKeys[0]],
    queryFn: () => getApiProjectsSidebar(),
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || []);
    }
  }, [query.data]);

  return { data, query };
}
