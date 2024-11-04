import { ObjectId } from 'mongoose';

export type MongoId = ObjectId | string;

export interface MongoDocument {
  _id?: MongoId;
  __v?: number;
}

export interface HasId {
  _id: MongoId;
}
