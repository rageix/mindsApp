import dayjs from 'dayjs';
import { IDay } from '@/types/Day';
import { nanoid } from 'nanoid';

export function makeDay(day: dayjs.Dayjs, isCurrentMonth: boolean): IDay {
  const today = dayjs();

  return {
    id: nanoid(),
    dayOfWeek: day.day(),
    dayOfMonth: day.date(),
    year: day.year(),
    isToday:
      today.year() === day.year() &&
      today.month() === day.month() &&
      today.date() === day.date(),
    isCurrentMonth,
  };
}
