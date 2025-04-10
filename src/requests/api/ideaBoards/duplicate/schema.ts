import { MongoId } from '@/types/MongoDocument';

export interface IDuplicate {
  _id: MongoId;
}

export interface IResumesCreateResponse {
  _id: MongoId
}