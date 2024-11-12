import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MongoId } from '@/types/MongoDocument';
import { ITeamsInvoicesResponse } from '@/requests/api/teams/invoices/schema';
import { getApiTeamsInvoices } from '@/requests/api/teams/invoices';

export default function useInvoices(teamId: MongoId) {
  const [data, setData] = useState<ITeamsInvoicesResponse>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/teams/invoices/:teamId', teamId],
    queryFn: () => {
      setLoading(true);
      return getApiTeamsInvoices({ teamId });
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
