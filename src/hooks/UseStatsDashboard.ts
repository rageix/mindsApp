import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MongoId } from '@/types/MongoDocument';
import { getApiStatsDashboard } from '@/requests/api/stats/dashboard';
import { IStatsDashboard } from '@/types/Stats';

export default function useStatsDashboard(teamId: MongoId) {
  const [data, setData] = useState<IStatsDashboard>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/stats/dashboard/:teamId', teamId],
    queryFn: teamId
      ? () => {
          setLoading(true);
          return getApiStatsDashboard({ teamId });
        }
      : undefined,
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
