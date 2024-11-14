'use client';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Month from './Month';
import { MONTHS_LONG } from '@/util/Time';
import { IDay } from '@/types/Day';
import { useMemo } from 'react';
import { genMonth } from '@/util/GenMonth';

interface IProps {
  month: number;
  year: number;
  onClickDay?: (value: IDay) => void;
  onClickNextMonth?: () => void;
  onClickPreviousMonth?: () => void;
}

export default function MiniCalendar({
  month,
  year,
  onClickDay,
  onClickNextMonth,
  onClickPreviousMonth,
}: IProps) {
  const monthData = useMemo(() => {
    return genMonth(month, year);
  }, [month, year]);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        <div className="flex items-center text-center text-gray-900">
          {onClickPreviousMonth && (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={onClickPreviousMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon
                className="size-5"
                aria-hidden="true"
              />
            </button>
          )}
          <div className="flex-auto text-sm font-semibold">
            {MONTHS_LONG[month]} {year}
          </div>
          {onClickNextMonth && (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={onClickNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon
                className="size-5"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
      <Month
        month={monthData}
        onClickDay={(value) => (onClickDay ? onClickDay(value) : null)}
      />
    </div>
  );
}
