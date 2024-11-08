import { MongoId } from '@/types/MongoDocument';
import { EPlan } from '@/types/IPlan';
import { ESubscriptionLength } from '@/types/Subscriptions';

export interface ISubscriptionRequest {
  teamId: MongoId;
  planId: EPlan;
  length: ESubscriptionLength;
  promoCode?: string;
  stripeId: string;
}
