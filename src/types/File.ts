import { MongoDocument, MongoId } from './MongoDocument';
import { IUserPublic } from './UserPublic';

export enum EFileType {
  Image = 'image',
  Video = 'video',
}

export interface IFile extends MongoDocument {
  userId: MongoId;
  user: IUserPublic;
  name: string;
  public: boolean;
  fileType: EFileType;
  locked: boolean;
  lockedReason?: string;
  lockedAt?: Date;
  createdAt?: Date;
}
