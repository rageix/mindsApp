import { MongoDocument, MongoId } from './MongoDocument';

export interface IPasswordReset extends MongoDocument {
  userId: MongoId;
  expires?: Date;
}
