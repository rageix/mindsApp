import { postJson } from '@/util/Requests';
import {
  ICheckoutStatusRequest,
  ICheckoutStatusResponse,
} from '@/requests/api/billing/checkout/status/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/billing/checkout/status';

export async function postApiBillingCheckoutStatus(
  arg: ICheckoutStatusRequest,
): Promise<ICheckoutStatusResponse | null> {
  return await postJson<ICheckoutStatusRequest, ICheckoutStatusResponse>(
    url,
    arg,
  );
}
