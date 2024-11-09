import { MongoId } from '@/types/MongoDocument';

export interface ISubscriptionsResumeRequest {
  subscriptionId: MongoId;
  teamId: MongoId;
}
