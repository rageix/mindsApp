import { MongoId } from '@/types/MongoDocument';

export interface IMembersEnabledRequest {
  memberId: MongoId;
  enabled: boolean
}
