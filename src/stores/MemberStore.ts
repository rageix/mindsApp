import { makeObservable } from '@/util/MakeObservable';
import { IMember } from '@/types/Member';

export interface IMemberStore {
  data: IMember | null;
  loaded: boolean;
}

export function newIMemberStore(): IMemberStore {
  return {
    data: null,
    loaded: false,
  };
}

const memberStore = makeObservable<IMemberStore>(newIMemberStore());
export default memberStore;
