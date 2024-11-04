import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { ITeam } from '@/types/Team';
import { getApiTeams } from '@/requests/api/teams';

export default function useTeam(_id: MongoId | undefined) {
  const [data, setData] = useState<IHasId<ITeam>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/teams/:_id', _id],
    queryFn: _id
      ? () => {
          setLoading(true);
          return getApiTeams(_id);
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
