import { getJson } from '@/util/Requests';
import {
  ISubscriptionsPortalRequest,
  ISubscriptionsPortalResponse,
} from '@/requests/api/teams/subscriptions/portal/schema';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscriptions/portal';

export async function getApiTeamsSubscriptionsPortal(
  arg: ISubscriptionsPortalRequest,
): Promise<ISubscriptionsPortalResponse | null> {
  return await getJson<ISubscriptionsPortalResponse>(url + '/' + arg.teamId);
}
