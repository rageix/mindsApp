import { MongoDocument, MongoId } from './MongoDocument.js';
import { EModel } from './Model.js';

export interface IChat extends MongoDocument {
  userId: MongoId;
  model: EModel;
  name: string;
  createdAt?: Date;
}
