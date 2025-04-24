'use client';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import BasicController from '@/util/BasicController';
import subscriptionStore, {
  ISubscriptionStore,
} from '@/stores/CurrentSubscription';
import { getApiBillingSubscriptionsCurrent } from '@/requests/api/billing/subscriptions/current';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

export class SubscriptionService extends BasicController<ISubscriptionStore> {
  query: UseQueryResult<IHasId<ISubscription> | null, Error> | undefined;

  useController = () => {
    // this._useController();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [this.state, this.updateState] = useState(subscriptionStore.get());

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (this.updateState) {
        return subscriptionStore.subscribe(this.updateState);
      }
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.query = useQuery({
      queryKey: ['/api/billing/subscriptions/current'],
      queryFn: () => getApiBillingSubscriptionsCurrent(),
      refetchOnWindowFocus: false,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
