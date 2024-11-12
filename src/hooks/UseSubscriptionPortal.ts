import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MongoId } from '@/types/MongoDocument';
import { ISubscriptionsPortalResponse } from '@/requests/api/teams/subscriptions/portal/schema';
import { getApiTeamsSubscriptionsPortal } from '@/requests/api/teams/subscriptions/portal';

export default function useSubscriptionPortal(teamId: MongoId) {
  const [data, setData] = useState<ISubscriptionsPortalResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/subscriptions/portal/:teamId', teamId],
    queryFn: () => {
      setLoading(true);
      return getApiTeamsSubscriptionsPortal({ teamId });
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

  return { data, query, initLoad, loading };
}
