import { MongoId } from '@/types/MongoDocument';

export interface IUserPasswordResetRequest {
  id: MongoId;
  password: string;
}
