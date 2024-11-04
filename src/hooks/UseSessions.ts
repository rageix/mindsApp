import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApiUserCurrentSessions } from '@/requests/api/user/current/sessions';
import { ISession } from '@/types/Session';

export default function useSessions() {
  const [data, setData] = useState<ISession[]>([]);
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/user/current/sessions'],
    queryFn: () => {
      setLoading(true);
      return getApiUserCurrentSessions();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || []);
      setInitLoad(true);
      setLoading(false);
    }
  }, [query.data]);

  return { data, query, initLoad, loading };
}
