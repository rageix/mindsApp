import { MongoId } from '@/types/MongoDocument';
import { EPlan, EPlanInterval } from '@/types/IPlan';

export interface ICheckoutSessionRequest {
  interval: EPlanInterval;
  plan: EPlan;
  teamId: MongoId;
}

export interface ICheckoutSessionResponse {
  stripeSessionId: string;
  clientSecret: string | null;
}
