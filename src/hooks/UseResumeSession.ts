import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IResume } from '@/types/Resume';
import { getApiResumesSession } from '@/requests/api/resumes/session';
import tokenService from '@/services/TokenService';

export default function useResumeSession() {
  const [data, setData] = useState<IHasId<IResume> | undefined>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/resumes/session'],
    queryFn: () => {
      setLoading(true);
      return getApiResumesSession();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      if (query.data?.token) {
        tokenService.save(query.data.token);
      }
      setData(query?.data?.resume || undefined);
      setInitLoad(true);
      setLoading(false);
    }
  }, [query.data]);

  return { data, query, initLoad, loading };
}
