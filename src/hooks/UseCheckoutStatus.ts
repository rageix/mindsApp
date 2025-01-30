import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ICheckoutStatusRequest,
  ICheckoutStatusResponse,
} from '@/requests/api/billing/checkout/status/schema';
import { postApiBillingCheckoutStatus } from '@/requests/api/billing/checkout/status';

export default function useCheckoutStatus(value: ICheckoutStatusRequest) {
  const [data, setData] = useState<ICheckoutStatusResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/checkout/status', value.stripeSessionId],
    queryFn: () => {
      setLoading(true);
      return postApiBillingCheckoutStatus(value);
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

  function reload() {
    setData(undefined);
    query.refetch();
  }

  return { data, query, reload, initLoad, loading };
}
