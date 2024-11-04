import { MongoDocument, MongoId } from './MongoDocument';

export interface IVerifyEmail extends MongoDocument {
  userId: MongoId;
  createdAt?: Date;
}
