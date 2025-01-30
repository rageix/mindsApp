import { postJson } from '@/util/Requests';
import { ISubscriptionsCancelRequest } from '@/requests/api/billing/subscriptions/cancel/schema';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/billing/subscriptions/cancel';

export async function postApiBillingSubscriptionsCancel(
  arg: ISubscriptionsCancelRequest,
): Promise<IHasId<ISubscription> | null> {
  return await postJson<ISubscriptionsCancelRequest, IHasId<ISubscription>>(
    url,
    arg,
  );
}
