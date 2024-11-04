import { IMember } from '@/types/Member';
import { MongoId } from '@/types/MongoDocument';

export interface IMemberRequest extends IMember {}

export interface IDeleteRequest {
  ids: MongoId[];
  teamId: MongoId;
}
