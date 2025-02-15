'use client';
import { IRBDate } from '@/types/Resume';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { MONTHS_ABBR } from '@/util/Time';
import { useMemo } from 'react';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';

interface IProps {
  value: IRBDate | null;
  onChange: (value: IRBDate | null) => void;
  showPresent?: boolean;
}

export default function MonthPicker({ value, onChange, showPresent }: IProps) {
  const year: number = useMemo(() => {
    if (value?.year) {
      return value.year;
    }

    return new Date().getFullYear();
  }, [value?.year]);

  function onClickYear() {
    onChange({
      month: value?.month || null,
      year: year,
      present: false,
    });
  }

  function onClickPrevYear() {
    onChange({
      month: value?.month || null,
      year: year - 1,
      present: value?.present || false,
    });
  }

  function onClickNextYear() {
    onChange({
      month: value?.month || null,
      year: year + 1,
      present: value?.present || false,
    });
  }

  function onClickMonth(month: number) {
    const newMonth: number | null = value?.month === month ? null : month;
    onChange({ month: newMonth, year, present: false });
  }

  function onClickPresent() {
    onChange({
      month: null,
      year: year,
      present: !value?.present,
    });
  }

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-md flex flex-col gap-y-2 my-0.5">
      <div className="">
        <div className="flex gap-y-4 items-center text-center text-gray-900">
          <Button
            variant="custom"
            className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-600 focus-visible:outline-blue-600"
            isInline
            onClick={onClickPrevYear}
          >
            <span className="sr-only">Previous Year</span>
            <ChevronLeftIcon
              className="size-5"
              aria-hidden="true"
            />
          </Button>
          <div className="flex-auto text-sm font-semibold">
            <Button
              variant="link"
              onClick={onClickYear}
            >
              {year}
            </Button>
          </div>
          <Button
            variant="custom"
            className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-600 focus-visible:outline-blue-600"
            isInline
            onClick={onClickNextYear}
          >
            <span className="sr-only">Next Year</span>
            <ChevronRightIcon
              className="size-5"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {MONTHS_ABBR.map((v, i) => (
          <Button
            variant="link"
            className={cn(value?.month === i ? 'bg-blue-100' : null)}
            key={i}
            onClick={() => onClickMonth(i)}
          >
            {v}
          </Button>
        ))}
      </div>
      {showPresent && (
        <div className="flex mt-3">
          <Button
            variant="blue"
            isActive={value?.present}
            onClick={onClickPresent}
          >
            Present
          </Button>
        </div>
      )}
    </div>
  );
}
