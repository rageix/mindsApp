import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ICheckoutStatusRequest,
  ICheckoutStatusResponse,
} from '@/requests/api/checkout/status/schema';
import { postApiCheckoutStatus } from '@/requests/api/checkout/status';

export default function useCheckoutStatus(value: ICheckoutStatusRequest) {
  const [data, setData] = useState<ICheckoutStatusResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/checkout/status', value.stripeSessionId],
    queryFn: () => {
      setLoading(true);
      return postApiCheckoutStatus(value);
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
