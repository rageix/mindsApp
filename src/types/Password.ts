import { ObjectId } from 'mongoose';
import { MongoDocument } from './MongoDocument';

export interface IPassword extends MongoDocument {
  userId: ObjectId | string;
  hash: string;
  updated?: Date;
}
