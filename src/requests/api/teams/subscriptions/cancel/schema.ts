import { MongoId } from '@/types/MongoDocument';

export interface ISubscriptionsCancelRequest {
  teamId: MongoId;
}
