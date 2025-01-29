import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IResumesFilter } from '@/requests/api/resumes/paginated/schema';
import { IResume } from '@/types/Resume';
import { postApiResumesPaginated } from '@/requests/api/resumes/paginated';
import { deleteApiResumes } from '@/requests/api/resumes';

export default function useResumes(filters: IResumesFilter) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IResume>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/resumes/paginated', filters],
    queryFn: () => {
      setLoading(true);
      return postApiResumesPaginated(filters);
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

  async function deleteItems(ids: MongoId[]) {
    await deleteApiResumes({ ids });
    query.refetch();
  }

  return { data, query, deleteItems, initLoad, loading };
}
