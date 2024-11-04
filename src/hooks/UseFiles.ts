import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { IFilesFilters } from '@/requests/api/files/paginated/schema';
import { IFile } from '@/types/File';
import { fileQueryKeys } from '@/util/Files';
import { postApiFilesPaginated } from '@/requests/api/files/paginated';

export default function useFiles(filters: IFilesFilters) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IFile>>>();
  const [files, setFiles] = useState<IHasId<IFile>[]>([]);
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: [fileQueryKeys[0], filters],
    queryFn: () => {
      setLoading(true);
      return postApiFilesPaginated(filters);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
      setFiles(files.concat(query.data?.data || []));
      setInitLoad(true);
      setLoading(false);
    }
  }, [query.data]);

  return { data, files, query, initLoad, loading };
}
