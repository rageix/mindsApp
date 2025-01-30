import { MongoId } from '@/types/MongoDocument';

export interface ISubscriptionsCancelRequest {
  subscriptionId: MongoId;
}
