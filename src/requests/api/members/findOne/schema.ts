import { MongoId } from '@/types/MongoDocument';

export interface IMemberFindRequest {
  _id: MongoId;
  teamId: MongoId;
}
