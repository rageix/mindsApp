'use client';
import { IRBDate } from '@/types/Resume';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { MONTHS_ABBR } from '@/util/Time';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';
import { CloseButton } from '@headlessui/react';
import Input from '@/components/Input';
import FormLabel from '@/components/FormLabel';

interface IProps {
  value: IRBDate | null;
  onChange: (value: IRBDate | null) => void;
  showPresent?: boolean;
}

export default function MonthPicker({ value, onChange, showPresent }: IProps) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [yearInput, setYearInput] = useState('');

  useEffect(() => {
    if (value?.year && value.year !== year) {
      setYear(value.year);
    }
  }, [value?.year]);

  useEffect(() => {
    if (String(year) !== yearInput) {
      setYearInput(String(year));
    }
  }, [year]);

  function onChangeYearInput(e: ChangeEvent<HTMLInputElement>) {
    setYearInput(e.target.value);

    const value = e.target.valueAsNumber;
    setYear(value);

    onChange({
      month: null,
      year: value,
      present: false,
    });
  }

  function onClickYear() {
    if (value?.month !== null) {
      onChange({
        month: null,
        year: year,
        present: false,
      });
      return;
    }

    onChange({
      month: null,
      year: value?.year ? null : year,
      present: false,
    });
  }

  function onClickPrevYear() {
    setYear(year - 1);
    // onChange({
    //   month: value?.month || null,
    //   year: year - 1,
    //   present: value?.present || false,
    // });
  }

  function onClickNextYear() {
    setYear(year + 1);
    // onChange({
    //   month: value?.month || null,
    //   year: year + 1,
    //   present: value?.present || false,
    // });
  }

  function onClickMonth(month: number) {
    if (month === value?.month && year === value?.year) {
      onChange({ month: null, year: null, present: false });
      return;
    }

    onChange({ month, year, present: false });
  }

  function onClickPresent() {
    if (value?.present) {
      onChange({
        month: null,
        year: null,
        present: false,
      });
      return;
    }

    onChange({
      month: null,
      year: null,
      present: true,
    });
  }

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-md flex flex-col gap-y-2 my-0.5">
      <div className="">
        <div className="flex gap-x-2 gap-y-4 items-center text-center text-gray-900">
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
              className={cn(
                value?.year === year && value?.month === null && !value?.present
                  ? 'bg-blue-100'
                  : null,
              )}
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
      {(value?.present || value?.month !== null || !value?.year) && (
        <>
          <div className="grid grid-cols-4 gap-4">
            {MONTHS_ABBR.map((v, i) => (
              <Button
                variant="link"
                className={cn(
                  value?.month === i && value?.year === year
                    ? 'bg-blue-100'
                    : null,
                )}
                key={i}
                onClick={() => onClickMonth(i)}
              >
                {v}
              </Button>
            ))}
          </div>
          {showPresent && (
            <div className="flex">
              <Button
                variant="link"
                isActive={value?.present}
                onClick={onClickPresent}
              >
                Present
              </Button>
            </div>
          )}
        </>
      )}
      {!value?.present && value?.year && value?.month === null && (
        <div className="max-w-[15.625rem] mb-2">
          <FormLabel>Change Year To</FormLabel>
          <Input
            type="number"
            value={yearInput}
            onChange={onChangeYearInput}
          />
        </div>
      )}
      <CloseButton as="div">
        <Button variant="blue">OK</Button>
      </CloseButton>
    </div>
  );
}
