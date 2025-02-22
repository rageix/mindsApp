import { MongoId } from '@/types/MongoDocument';

export interface IResumesDuplicate {
  _id: MongoId;
}

export interface IResumesCreateResponse {
  _id: MongoId
}