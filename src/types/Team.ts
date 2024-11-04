import { MongoDocument, MongoId } from './MongoDocument';

export interface ITeam extends MongoDocument {
  userId: MongoId;
  name: string;
  avatar?: MongoId;
  created?: Date;
  updated?: Date;
}
