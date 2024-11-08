import { postJson } from '@/util/Requests';
import {
  ICheckoutStatusRequest,
  ICheckoutStatusResponse,
} from '@/requests/api/checkout/status/schema';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/checkout/status';

export async function postApiCheckoutStatus(
  arg: ICheckoutStatusRequest,
): Promise<ICheckoutStatusResponse | null> {
  return await postJson<ICheckoutStatusRequest, ICheckoutStatusResponse>(
    url,
    arg,
  );
}
