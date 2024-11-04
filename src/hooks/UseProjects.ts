import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IProjectFilters } from '@/requests/api/projects/paginated/schema';
import { postApiProjectsPaginated } from '@/requests/api/projects/paginated';
import { IHasId } from '@/types/HasId';
import { IProject } from '@/types/Project';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { deleteApiProjects } from '@/requests/api/projects';
import { projectQueryKeys } from '@/util/Projects';

export default function useProjects(filters: IProjectFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IProject>>>();

  const query = useQuery({
    queryKey: [projectQueryKeys[1], filters],
    queryFn: () => postApiProjectsPaginated(filters),
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
    }
  }, [query.data]);

  async function deleteItems(ids: MongoId[]) {
    await deleteApiProjects({ ids });
    query.refetch();
  }

  return { data, query, deleteItems };
}
