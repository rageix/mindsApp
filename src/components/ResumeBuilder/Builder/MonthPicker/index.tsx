'use client';
import { IRBDate } from '@/types/ResumeBuilder';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { MONTHS_ABBR } from '@/util/Time';
import { useMemo } from 'react';
import Button from '@/components/Buttton';

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
      present: value?.present || false,
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
    onChange({ month: newMonth, year, present: value?.present || false });
  }

  function onClickPresent() {
    onChange({
      month: value?.month || null,
      year: year,
      present: !value?.present,
    });
  }

  return (
    <div className="bg-white p-3 border rounded-md flex flex-col gap-y-2 my-0.5">
      <div className="">
        <div className="flex gap-y-4 items-center text-center text-gray-900">
          <button
            type="button"
            className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={onClickPrevYear}
          >
            <span className="sr-only">Previous Year</span>
            <ChevronLeftIcon
              className="size-5"
              aria-hidden="true"
            />
          </button>
          <div className="flex-auto text-sm font-semibold">
            <Button
              variant="link"
              onClick={onClickYear}
            >
              {year}
            </Button>
          </div>
          <button
            type="button"
            className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={onClickNextYear}
          >
            <span className="sr-only">Next Year</span>
            <ChevronRightIcon
              className="size-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {MONTHS_ABBR.map((v, i) => (
          <Button
            variant="link"
            className=""
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
