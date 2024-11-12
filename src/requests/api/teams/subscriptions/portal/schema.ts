import { MongoId } from '@/types/MongoDocument';

export interface ISubscriptionsPortalRequest {
  teamId: MongoId;
}

export interface ISubscriptionsPortalResponse {
  url: string;
}
