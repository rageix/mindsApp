import { getJson } from '@/util/Requests';
import { ISubscriptionsPortalResponse } from '@/requests/api/billing/subscriptions/portal/schema';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/billing/subscriptions/portal';

export async function getApiBillingSubscriptionsPortal(): Promise<ISubscriptionsPortalResponse | null> {
  return await getJson<ISubscriptionsPortalResponse>(url);
}
