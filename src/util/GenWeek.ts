import dayjs from 'dayjs';
import { IDay } from '@/types/Day';
import { nanoid } from 'nanoid';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { makeDay } from '@/util/MakeDay';
import { IWeek } from '@/types/Week';
dayjs.extend(utc);
dayjs.extend(weekOfYear);

export function genWeek(week: number, year: number): IWeek {
  const days: IDay[] = [];
  const firstDay = dayjs()
    .utc()
    .year(year)
    .week(week)
    .minute(0)
    .hour(0)
    .second(0);

  for (let i = 0; i < 7; i++) {
    const day = firstDay.add(i, 'd');
    days.push(makeDay(day, false));
  }

  return {
    id: nanoid(),
    week,
    year,
    month: firstDay.month(),
    days,
  };
}
