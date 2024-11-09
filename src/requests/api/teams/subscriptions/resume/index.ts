import { postJson } from '@/util/Requests';
import { ISubscriptionsResumeRequest } from '@/requests/api/teams/subscriptions/resume/schema';
import { IHasId } from '@/types/HasId';
import { ISubscription } from '@/types/Subscriptions';

const url =
  process.env.NEXT_PUBLIC_API_HOST + '/api/teams/subscriptions/resume';

export async function postApiTeamsSubscriptionsResume(
  arg: ISubscriptionsResumeRequest,
): Promise<IHasId<ISubscription> | null> {
  return await postJson<ISubscriptionsResumeRequest, IHasId<ISubscription>>(
    url,
    arg,
  );
}
