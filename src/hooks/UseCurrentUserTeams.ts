import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { ITeam } from '@/types/Team';
import { getApiUserCurrentTeams } from '@/requests/api/user/current/teams';

export default function useCurrentUserTeams() {
  const [data, setData] = useState<IHasId<ITeam>[]>([]);
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/users/current/teams'],
    queryFn: () => {
      setLoading(true);
      return getApiUserCurrentTeams();
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
