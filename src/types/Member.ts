import { MongoDocument, MongoId } from './MongoDocument';
import { IUserCache } from '@/types/UserCache';
import { ITeamCache } from '@/types/TeamCache';

export enum EMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
}

export interface IMember extends MongoDocument {
  enabled: boolean;
  userId?: MongoId;
  user?: IUserCache;
  teamId: MongoId;
  team?: ITeamCache;
  role: EMemberRole;
  inviteEmail?: string;
  default?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
