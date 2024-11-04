import { MongoDocument, MongoId } from './MongoDocument';

export interface IProject extends MongoDocument {
  userId: MongoId;
  name: string;
  pinned: boolean;
  createdAt?: Date;
}
