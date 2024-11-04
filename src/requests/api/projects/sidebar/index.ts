import { getJson } from '@/util/Requests';
import { IProject } from '@/types/Project';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/projects/sidebar';

export async function getApiProjectsSidebar(): Promise<
  IHasId<IProject>[] | null
> {
  return await getJson<IHasId<IProject>[]>(url);
}
