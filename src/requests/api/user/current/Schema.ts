import { IUser } from '@/types/User';

export interface IUserProfileProfileUpdateRequest
  extends Pick<IUser, 'name' | 'email'> {}
