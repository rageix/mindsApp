import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import { ECalendarView } from '@/types/Calendar';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';
import Button from '@/components/Buttton';
import YearCalendar from '@/components/Calendar/Year';
import PopoverMenu from '@/components/PopoverMenu';
import Month from '@/components/Calendar/Month';
import Week from '@/components/Calendar/Week';

const viewOptions: ISelectOption<ECalendarView>[] = [
  {
    key: ECalendarView.Day,
    value: ECalendarView.Day,
    label: 'Day',
  },
  {
    key: ECalendarView.Week,
    value: ECalendarView.Week,
    label: 'Week',
  },
  {
    key: ECalendarView.Month,
    value: ECalendarView.Month,
    label: 'Month',
  },
  {
    key: ECalendarView.Year,
    value: ECalendarView.Year,
    label: 'Year',
  },
];

export default function Calendar() {
  const [view, setView] = useState<ISelectOption<ECalendarView>>(
    viewOptions[3],
  );
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState<number>(11);
  const [week, setWeek] = useState<number>(11);
  const [day, setDay] = useState<number>(11);

  function onClickNext() {
    switch (view.value) {
      case ECalendarView.Day:
        setDay(day + 1);
        break;
      case ECalendarView.Week:
        setWeek(week + 1);
        break;
      case ECalendarView.Month:
        setMonth(month + 1);
        break;
      case ECalendarView.Year:
        setYear(year + 1);
        break;
    }
  }

  function onClickPrevious() {
    switch (view.value) {
      case ECalendarView.Day:
        setDay(day - 1);
        break;
      case ECalendarView.Week:
        setWeek(week - 1);
        break;
      case ECalendarView.Month:
        setMonth(month - 1);
        break;
      case ECalendarView.Year:
        setYear(year - 1);
        break;
    }
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none bg-gray-50">
        <h1 className="text-base font-semibold text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={onClickPrevious}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon
                className="size-5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={onClickNext}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon
                className="size-5"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Select
              options={viewOptions}
              value={view}
              onChange={(option) => setView(option)}
              buttonClassName="!w-[6rem]"
            />
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <Button
              variant="blue"
              // className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </Button>
          </div>
          <PopoverMenu
            options={viewOptions}
            onClick={(option) => setView(option)}
            className="ml-6 md:hidden"
          >
            <EllipsisIcon
              className="size-5"
              aria-hidden="true"
            />
          </PopoverMenu>
        </div>
      </header>
      {view.value === ECalendarView.Week && (
        <Week
          week={week}
          year={year}
        />
      )}
      {view.value === ECalendarView.Month && (
        <Month
          month={month}
          year={year}
        />
      )}
      {view.value === ECalendarView.Year && <YearCalendar year={year} />}
    </div>
  );
}
