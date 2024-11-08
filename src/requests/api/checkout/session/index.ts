import { postJson } from '@/util/Requests';
import {
  ICheckoutSessionRequest,
  ICheckoutSessionResponse,
} from '@/requests/api/checkout/session/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/checkout/session';

export async function postApiCheckoutSession(
  arg: ICheckoutSessionRequest,
): Promise<ICheckoutSessionResponse | null> {
  return await postJson<ICheckoutSessionRequest, ICheckoutSessionResponse>(
    url,
    arg,
  );
}
