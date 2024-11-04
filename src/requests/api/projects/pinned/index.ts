import { postJson } from '@/util/Requests';
import { IProjectPinnedRequest } from '@/requests/api/projects/pinned/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/projects/pinned';

export async function postApiProjectsPinned(
  arg: IProjectPinnedRequest,
): Promise<{} | null> {
  return await postJson<IProjectPinnedRequest, {}>(url, arg);
}
