import { MongoId } from '@/types/MongoDocument';
import { EMemberRole } from '@/types/Member';

export interface IMembersRoleRequest {
  memberId: MongoId;
  role: EMemberRole;
}
