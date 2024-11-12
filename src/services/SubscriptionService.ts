'use client';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import BasicController from '@/util/BasicController';
import useTeamId from '@/hooks/UseTeamId';
import subscriptionStore, {
  ISubscriptionStore,
} from '@/stores/CurrentSubscription';
import { getApiTeamsSubscriptionsCurrent } from '@/requests/api/teams/subscriptions/current';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

export class SubscriptionService extends BasicController<ISubscriptionStore> {
  query: UseQueryResult<IHasId<ISubscription> | null, Error> | undefined;

  useController = () => {
    // this._useController();
    [this.state, this.updateState] = useState(subscriptionStore.get());
    const teamId = useTeamId();

    useEffect(() => {
      if (this.updateState) {
        return subscriptionStore.subscribe(this.updateState);
      }
    }, []);

    this.query = useQuery({
      queryKey: ['/api/teams/subscription/current/:teamId', teamId],
      queryFn: () => getApiTeamsSubscriptionsCurrent({ teamId }),
      refetchOnWindowFocus: false,
    });

    useEffect(() => {
      // console.log(
      //   'this.query?.isFetched',
      //   this.query?.isFetched,
      //   this.query?.data,
      // );
      if (!this.query?.isFetched) {
        return;
      }

      subscriptionStore.set({
        data: this.query?.data || null,
        loaded: true,
      });
    }, [this.query.isFetching]);
  };

  reload = () => {
    if (this.query) {
      this.query.refetch();
    }
  };

  isLoaded = (): boolean => {
    return this.state?.loaded;
  };
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
