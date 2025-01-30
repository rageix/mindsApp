import { getJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/billing/subscriptions/current';

export async function getApiBillingSubscriptionsCurrent(): Promise<IHasId<ISubscription> | null> {
  return getJson<IHasId<ISubscription>>(url);
}
