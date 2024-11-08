import { postJson } from '@/util/Requests';
import { OKResponse } from '@/types/OKResponse';
import { ISubscriptionsCancelRequest } from '@/requests/api/teams/subscriptions/cancel/schema';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscriptions/cancel';

export async function postApiTeamsSubscriptionsCancel(
  arg: ISubscriptionsCancelRequest,
): Promise<OKResponse | null> {
  return await postJson<ISubscriptionsCancelRequest, OKResponse>(url, arg);
}
