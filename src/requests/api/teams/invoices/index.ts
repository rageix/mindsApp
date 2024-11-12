import { getJson } from '@/util/Requests';
import {
  ITeamsInvoicesRequest,
  ITeamsInvoicesResponse,
} from '@/requests/api/teams/invoices/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/teams/invoices';

export async function getApiTeamsInvoices(
  arg: ITeamsInvoicesRequest,
): Promise<ITeamsInvoicesResponse | null> {
  return await getJson<ITeamsInvoicesResponse>(url + '/' + arg.teamId);
}
