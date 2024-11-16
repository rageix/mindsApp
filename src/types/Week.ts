import { IDay } from '@/types/Day';

export interface IWeek {
  id: string;
  week: number;
  year: number;
  month: number;
  days: IDay[];
}
