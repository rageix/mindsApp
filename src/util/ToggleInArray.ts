import _ from 'lodash';

export function toggleInArray<T>(target: T[], item: T): T[] {
  return _.xor(target, [item]);
}
