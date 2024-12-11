import { MongoDocument, MongoId } from './MongoDocument';
import { IUserCache } from './UserCache';

export interface IResponseRating extends MongoDocument {
  formResponseId: MongoId;
  teamId: MongoId;
  userId: MongoId;
  user?: IUserCache;
  thumbsUp: boolean;
  comment: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export function newIResponseRating(): IResponseRating {
  return {
    formResponseId: '',
    teamId: '',
    userId: '',
    thumbsUp: false,
    comment: '',
  };
}