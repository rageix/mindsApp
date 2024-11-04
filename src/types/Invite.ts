import { MongoDocument, MongoId } from './MongoDocument';
import { ITeam } from '@/types/Team';

export interface IInvite extends MongoDocument {
  teamId: MongoId;
  team?: ITeam;
  email: string;
  admin: boolean;
  expiresAt?: Date;
}
