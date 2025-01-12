'use client';
import { IRBDate } from '@/types/ResumeBuilder';
import { MONTHS_ABBR } from '@/util/Time';
import { MouseEvent, useMemo } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Input from '@/components/Input';
import MonthPicker from '@/components/ResumeBuilder/Builder/MonthPicker';
import { XIcon } from 'lucide-react';
import Button from '@/components/Buttton';
import _ from 'lodash';

interface IProps<T> {
  value: IRBDate | null;
  onChange: (value: IRBDate | null) => void;
  showPresent?: boolean;
  isClearable?: boolean;
  field?: keyof T;
}

export default function MonthYearInput<T>({
  value,
  onChange,
  showPresent,
  isClearable,
  field,
}: IProps<T>) {
  const inputValue: string = useMemo(() => {
    if (value?.present) {
      return 'Present';
    }

    let output = '';

    if (_.isNumber(value?.month)) {
      output += MONTHS_ABBR[value.month] + ' ';
    }
    if (_.isNumber(value?.year)) {
      output += value.year;
    }

    return output;
  }, [value]);

  function onClickClear(e: MouseEvent | undefined) {
    e?.stopPropagation();
    onChange(null);
  }

  return (
    <Popover className="relative">
      <PopoverButton
        as="div"
        className="group"
        onClick={() => (document?.activeElement as HTMLElement)?.blur()}
      >
        <Input
          field={field}
          value={inputValue}
          className="group-data-[active]:ring-2 group-data-[active]:ring-blue-600"
          onChange={() => null}
        />
        {isClearable && (
          <div className="absolute inset-y-0 right-0 flex">
            <Button
              variant="custom"
              className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300 cursor-pointer"
              onClick={onClickClear}
            >
              <span className="sr-only">Clear</span>
              <XIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Button>
          </div>
        )}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col"
      >
        <MonthPicker
          value={value}
          onChange={onChange}
          showPresent={showPresent}
        />
      </PopoverPanel>
    </Popover>
  );
}
