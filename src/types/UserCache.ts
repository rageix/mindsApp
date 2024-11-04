import { IUser } from './User';

export interface IUserCache extends Pick<IUser, 'name' | 'email' | 'avatar'> {}
