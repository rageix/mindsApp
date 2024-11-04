import { MongoId } from '@/types/MongoDocument';

export interface IDeleteRequest {
  ids: MongoId[];
  teamId: MongoId;
}
