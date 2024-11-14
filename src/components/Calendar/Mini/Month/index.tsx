import { cn } from '@/util/Cn';
import { IMonth } from '@/types/Month';
import { IDay } from '@/types/Day';

interface IProps {
  month: IMonth;
  onClickDay: (value: IDay) => void;
}

export default function Month({ month, onClickDay }: IProps) {
  return (
    <section
      key={month.id}
      className="text-center"
    >
      <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500">
        <div className="text-gray-400">S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div className="text-gray-400">S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg overflow-hidden bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {month.days.map((day) => (
          <button
            key={day.id}
            type="button"
            className={cn(
              day.isCurrentMonth
                ? 'bg-white text-gray-900'
                : 'bg-gray-50 text-gray-400',
              // dayIdx === 0 && 'rounded-tl-lg',
              // dayIdx === 6 && 'rounded-tr-lg',
              // dayIdx === month.days.length - 7 && 'rounded-bl-lg',
              // dayIdx === month.days.length - 1 && 'rounded-br-lg',
              'py-1.5 hover:bg-gray-100 focus:z-10',
            )}
            onClick={() => onClickDay(day)}
          >
            <time
              // dateTime={day.date}
              className={cn(
                day.isToday ? 'bg-indigo-600 font-semibold text-white' : null,
                'mx-auto flex size-7 items-center justify-center rounded-full',
              )}
            >
              {day.dayOfMonth}
            </time>
          </button>
        ))}
      </div>
    </section>
  );
}
