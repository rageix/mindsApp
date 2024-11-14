import { IDay } from '@/types/Day';

export interface IMonth {
  id: string;
  name: string;
  days: IDay[];
}
