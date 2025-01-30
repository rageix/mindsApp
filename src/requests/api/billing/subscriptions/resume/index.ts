import { postJson } from '@/util/Requests';
import { ISubscriptionsResumeRequest } from '@/requests/api/billing/subscriptions/resume/schema';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/billing/subscriptions/resume';

export async function postApiBillingSubscriptionsResume(
  arg: ISubscriptionsResumeRequest,
): Promise<IHasId<ISubscription> | null> {
  return await postJson<ISubscriptionsResumeRequest, IHasId<ISubscription>>(
    url,
    arg,
  );
}
