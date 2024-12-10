import { MongoId } from '@/types/MongoDocument';

export interface IResponseRatingsFindMineRequest {
  _id: MongoId;
  teamId: MongoId;
}
