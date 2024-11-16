import dayjs from 'dayjs';
import { IMonth } from '@/types/Month';
import { IDay } from '@/types/Day';
import { nanoid } from 'nanoid';
import { MONTHS_LONG } from '@/util/Time';
import utc from 'dayjs/plugin/utc';
import { makeDay } from '@/util/MakeDay';
dayjs.extend(utc);

export function genMonth(month: number, year: number): IMonth {
  const days: IDay[] = [];
  const firstDay = dayjs()
    .utc()
    .year(year)
    .month(month)
    .date(1)
    .minute(0)
    .hour(0)
    .second(0);
  const daysInMonth = firstDay.daysInMonth();
  const lastDay = firstDay.add(daysInMonth - 1, 'day');
  const firstDayOfWeek = firstDay.day(); // 0 - 6, sunday - sat

  for (let i = firstDayOfWeek; i > 0; i--) {
    const day = firstDay.subtract(i, 'd');
    days.push(makeDay(day, false));
  }

  for (let i = 0, len = daysInMonth; i < len; i++) {
    const day = firstDay.add(i, 'd');
    days.push(makeDay(day, true));
  }

  for (let i = 1, len = 6 - lastDay.day(); i <= len; i++) {
    const day = lastDay.add(i, 'd');
    days.push(makeDay(day, false));
  }

  return {
    id: nanoid(),
    name: MONTHS_LONG[firstDay.month()],
    days: days,
  };
}
