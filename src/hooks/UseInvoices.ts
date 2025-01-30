import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IBillingInvoicesResponse } from '@/requests/api/billing/invoices/schema';
import { getApiBillingInvoices } from '@/requests/api/billing/invoices';

export default function useInvoices() {
  const [data, setData] = useState<IBillingInvoicesResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/billing/invoices', ],
    queryFn: () => {
      setLoading(true);
      return getApiBillingInvoices();
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
