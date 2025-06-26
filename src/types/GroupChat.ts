import { MongoDocument, MongoId } from './MongoDocument.js';

export interface IGroupChat extends MongoDocument {
  userId: MongoId;
  chatIds: MongoId[];
  lastMessageAt?: Date;
}
