'use client';
import MiniCalendar from '@/components/Calendar/Mini';

interface IProps {
  year: number;
}

export default function YearCalendar({ year }: IProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        <MiniCalendar
          year={year}
          month={0}
        />
        <MiniCalendar
          year={year}
          month={1}
        />
        <MiniCalendar
          year={year}
          month={2}
        />
        <MiniCalendar
          year={year}
          month={3}
        />
        <MiniCalendar
          year={year}
          month={4}
        />
        <MiniCalendar
          year={year}
          month={5}
        />
        <MiniCalendar
          year={year}
          month={6}
        />
        <MiniCalendar
          year={year}
          month={7}
        />
        <MiniCalendar
          year={year}
          month={8}
        />
        <MiniCalendar
          year={year}
          month={9}
        />
        <MiniCalendar
          year={year}
          month={10}
        />
        <MiniCalendar
          year={year}
          month={11}
        />
      </div>
    </div>
  );
}
