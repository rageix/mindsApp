import { MongoDocument } from './MongoDocument';
import { IUser } from './User';

export interface ISession extends MongoDocument {
  user: IUser;
  ip: string;
  userAgent: string;
  lastSeen: Date;
  createdAt?: Date;
}
