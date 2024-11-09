import { getJson } from '@/util/Requests';
import { IHasId } from '@/types/HasId';
import { ITeamsSubscriptionsCurrentRequest } from './schema';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscriptions/current';

export async function getApiTeamsSubscriptionsCurrent(
  arg: ITeamsSubscriptionsCurrentRequest,
): Promise<IHasId<ISubscription> | null> {
  return getJson<IHasId<ISubscription>>(url + '/' + arg.teamId);
}
