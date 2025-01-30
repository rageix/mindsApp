import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { ISubscription } from '@/types/Subscriptions';
import { getApiBillingSubscriptionsCurrent } from '@/requests/api/billing/subscriptions/current';
import { postApiBillingSubscriptionsCancel } from '@/requests/api/billing/subscriptions/cancel';
import { postApiBillingSubscriptionsResume } from '@/requests/api/billing/subscriptions/resume';

export default function useCurrentSubscription(teamId: MongoId) {
  const [data, setData] = useState<IHasId<ISubscription>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/teams/subscriptions/current', teamId],
    queryFn: () => {
      setLoading(true);
      return getApiBillingSubscriptionsCurrent();
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

  async function cancel() {
    if (data) {
      await postApiBillingSubscriptionsCancel({
        subscriptionId: data._id,
      });
      query.refetch();
    }
  }

  async function resume() {
    if (data) {
      await postApiBillingSubscriptionsResume({
        subscriptionId: data._id,
      });
      query.refetch();
    }
  }

  return { data, query, initLoad, loading, cancel, resume };
}

export type TUseCurrentSubscription = ReturnType<typeof useCurrentSubscription>;
