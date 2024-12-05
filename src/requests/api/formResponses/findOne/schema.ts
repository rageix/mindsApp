import { MongoId } from '@/types/MongoDocument';

export interface IFormResponsesFindRequest {
  _id: MongoId;
  teamId: MongoId;
}
