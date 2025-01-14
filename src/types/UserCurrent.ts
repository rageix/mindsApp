import { IUser } from './User';

export interface IUserCurrentResponse {
  accessToken?: string,
  user?: IUser
}