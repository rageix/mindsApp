import { MongoId } from '@/types/MongoDocument';

export interface IUserCurrentTeamsMemberRequest {
  teamId: MongoId;
}
