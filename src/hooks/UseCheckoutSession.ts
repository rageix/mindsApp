import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postApiCheckoutSession } from '@/requests/api/checkout/session';
import {
  ICheckoutSessionRequest,
  ICheckoutSessionResponse,
} from '@/requests/api/checkout/session/schema';

export default function useCheckoutSession(value: ICheckoutSessionRequest) {
  const [data, setData] = useState<ICheckoutSessionResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: [
      '/api/checkout/session',
      value.teamId,
      value.plan,
      value.interval,
    ],
    queryFn: () => {
      setLoading(true);
      return postApiCheckoutSession(value);
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
