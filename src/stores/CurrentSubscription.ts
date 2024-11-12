import { makeObservable } from '@/util/MakeObservable';
import { ISubscription } from '@/types/Subscriptions';

export interface ISubscriptionStore {
  data: ISubscription | null;
  loaded: boolean;
}

export function newISubscriptionStore(): ISubscriptionStore {
  return {
    data: null,
    loaded: false,
  };
}

const subscriptionStore = makeObservable<ISubscriptionStore>(
  newISubscriptionStore(),
);
export default subscriptionStore;
