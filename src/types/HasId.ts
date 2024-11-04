import { MongoId } from './MongoDocument';

export type IHasId<T extends {}> = T & {
  _id: MongoId;
};