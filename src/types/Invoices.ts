import { MongoDocument, MongoId } from './MongoDocument';
import { ISubscription } from './Subscriptions';

export interface IInvoice extends MongoDocument {
  teamId: MongoId;
  subscriptionId: MongoId;
  subscription: ISubscription;
  price: number;
  tax: number;
  total: number;
  stripeId?: string;
  createdAt: Date;
}
