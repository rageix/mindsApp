import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { ISubscription } from '@/types/Subscriptions';
import { getApiTeamsSubscriptionsCurrent } from '@/requests/api/teams/subscriptions/current';
import { postApiTeamsSubscriptionsCancel } from '@/requests/api/teams/subscriptions/cancel';
import { postApiTeamsSubscriptionsResume } from '@/requests/api/teams/subscriptions/resume';

export default function useCurrentSubscription(teamId: MongoId) {
  const [data, setData] = useState<IHasId<ISubscription>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/teams/subscriptions/current', teamId],
    queryFn: () => {
      setLoading(true);
      return getApiTeamsSubscriptionsCurrent({ teamId });
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
      await postApiTeamsSubscriptionsCancel({
        subscriptionId: data._id,
        teamId,
      });
      query.refetch();
    }
  }

  async function resume() {
    if (data) {
      await postApiTeamsSubscriptionsResume({
        subscriptionId: data._id,
        teamId,
      });
      query.refetch();
    }
  }

  return { data, query, initLoad, loading, cancel, resume };
}

export type TUseCurrentSubscription = ReturnType<typeof useCurrentSubscription>;
