import { MongoDocument, MongoId } from './MongoDocument';
import { EPlan } from './IPlan';

export enum ESubscriptionLength {
  Month = 'month',
  Year = 'year',
}

export interface ISubscription extends MongoDocument {
  teamId: MongoId;
  planId: EPlan;
  length: ESubscriptionLength;
  promoCode?: string;
  price: number;
  stripeId: string;
  nextAt?: Date | null;
  canceledAt?: Date | null;
  expiresAt?: Date | null;
  createdAt?: Date;
}
