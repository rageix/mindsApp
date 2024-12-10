import { MongoId } from '@/types/MongoDocument';

export interface IResponseRatingFindOneRequest {
  _id: MongoId;
  teamId: MongoId;
}
