import { MongoDocument, MongoId } from './MongoDocument';

export interface IUser extends MongoDocument {
  active: boolean;
  name: string;
  email: string;
  emailVerified: boolean;
  admin: boolean;
  avatar?: MongoId;
  createdAt?: Date;
  updatedAt?: Date;
}
