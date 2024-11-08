import { postJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ISubscriptionRequest } from '@/requests/api/teams/subscriptions/schema';
import { ISubscription } from '@/types/Subscriptions';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscription';

export async function postApiTeamsSubscriptions(
  arg: ISubscriptionRequest,
): Promise<IHasId<ISubscription> | null> {
  return await postJson<ISubscriptionRequest, IHasId<ISubscription>>(url, arg);
}
