import { getJson } from '@/util/Requests';
import { IStatsDashboardRequest } from './schema';
import { IStatsDashboard } from '@/types/Stats';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/stats/dashboard';

export async function getApiStatsDashboard(
  arg: IStatsDashboardRequest,
): Promise<IStatsDashboard | null> {
  return await getJson<IStatsDashboard>(url + '/' + String(arg.teamId));
}
