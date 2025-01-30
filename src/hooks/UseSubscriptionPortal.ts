import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ISubscriptionsPortalResponse } from '@/requests/api/billing/subscriptions/portal/schema';
import { getApiBillingSubscriptionsPortal } from '@/requests/api/billing/subscriptions/portal';

export default function useSubscriptionPortal() {
  const [data, setData] = useState<ISubscriptionsPortalResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/subscriptions/portal'],
    queryFn: () => {
      setLoading(true);
      return getApiBillingSubscriptionsPortal();
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
