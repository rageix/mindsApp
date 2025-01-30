import { getJson } from '@/util/Requests';
import {
  IBillingInvoicesResponse,
} from './schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/billing/invoices';

export async function getApiBillingInvoices(
): Promise<IBillingInvoicesResponse | null> {
  return await getJson<IBillingInvoicesResponse>(url);
}
