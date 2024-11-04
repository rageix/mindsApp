import { IUser } from '@/types/User';
import { makeObservable } from '@/util/MakeObservable';

export interface IUserStore {
  user: IUser | null;
  loaded: boolean;
}

export function newIUserStore(): IUserStore {
  return {
    user: null,
    loaded: false,
  };
}

const userStore = makeObservable<IUserStore>(newIUserStore());
export default userStore;
