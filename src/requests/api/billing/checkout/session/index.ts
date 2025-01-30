import { postJson } from '@/util/Requests';
import {
  ICheckoutSessionRequest,
  ICheckoutSessionResponse,
} from '@/requests/api/billing/checkout/session/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/billing/checkout/session';

export async function postApiBillingCheckoutSession(
  arg: ICheckoutSessionRequest,
): Promise<ICheckoutSessionResponse | null> {
  return await postJson<ICheckoutSessionRequest, ICheckoutSessionResponse>(
    url,
    arg,
  );
}
