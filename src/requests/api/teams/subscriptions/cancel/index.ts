import { postJson } from '@/util/Requests';
import { ISubscriptionsCancelRequest } from '@/requests/api/teams/subscriptions/cancel/schema';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscriptions/cancel';

export async function postApiTeamsSubscriptionsCancel(
  arg: ISubscriptionsCancelRequest,
): Promise<IHasId<ISubscription> | null> {
  return await postJson<ISubscriptionsCancelRequest, IHasId<ISubscription>>(
    url,
    arg,
  );
}
