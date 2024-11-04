import { MongoDocument, MongoId } from './MongoDocument';

export interface ICard extends MongoDocument {
  userId?: MongoId;
  teamId: MongoId;
  name: string;
  profileId: MongoId;
  scheduleId?: MongoId;
  updatedAt?: Date;
}
