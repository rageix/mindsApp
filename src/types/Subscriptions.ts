import { MongoDocument, MongoId } from './MongoDocument';
import { EPlan, EPlanInterval } from './IPlan';

export interface ISubscription extends MongoDocument {
  teamId: MongoId;
  plan: EPlan;
  interval: EPlanInterval;
  subtotal: number;
  sessionId: string;
  customerId: string;
  subscriptionId: string;
  nextAt: Date | null;
  canceledAt: Date | null;
  expiresAt: Date | null;
  createdAt?: Date;
}
