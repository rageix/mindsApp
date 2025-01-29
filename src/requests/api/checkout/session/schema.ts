import { EPlan } from '@/types/IPlan';

export interface ICheckoutSessionRequest {
  plan: EPlan;
}

export interface ICheckoutSessionResponse {
  stripeSessionId: string;
  clientSecret: string | null;
}
