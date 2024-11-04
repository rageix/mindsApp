import { ITeam } from '@/types/Team';
import { MongoId } from '@/types/MongoDocument';

export interface ITeamIdRequest {
  _id: MongoId;
}

export interface ITeamsPostRequest extends Pick<ITeam, '_id' | 'name'> {}
