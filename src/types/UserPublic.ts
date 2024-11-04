import { MongoId } from './MongoDocument';

export interface IUserPublic {
  _id: MongoId;
  username: string;
}
