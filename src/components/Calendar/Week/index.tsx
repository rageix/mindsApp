import { useEffect, useMemo, useRef } from 'react';
import { genWeek } from '@/util/GenWeek';
import MobileHeaderItem from '@/components/Calendar/Week/MobileHeaderItem';
import HeaderItem from '@/components/Calendar/Week/HeaderItem';

interface IProps {
  week: number;
  year: number;
}

export default function Week({ week, year }: IProps) {
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);

  const weekData = useMemo(() => genWeek(week, year), [week, year]);

  console.log(weekData);

  useEffect(() => {
    if (
      !container.current ||
      !containerNav.current ||
      !containerOffset.current
    ) {
      return;
    }

    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, [container.current, containerNav.current, containerOffset.current]);

  return (
    <div
      ref={container}
      className="isolate flex flex-auto flex-col overflow-auto bg-white"
    >
      <div
        style={{ width: '165%' }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black/5 sm:pr-8"
        >
          <div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden">
            <MobileHeaderItem
              label="S"
              value={weekData.days[0].dayOfMonth}
            />
            <MobileHeaderItem
              label="M"
              value={weekData.days[1].dayOfMonth}
            />
            <MobileHeaderItem
              label="T"
              value={weekData.days[2].dayOfMonth}
            />
            <MobileHeaderItem
              label="W"
              value={weekData.days[3].dayOfMonth}
            />
            <MobileHeaderItem
              label="T"
              value={weekData.days[4].dayOfMonth}
            />
            <MobileHeaderItem
              label="F"
              value={weekData.days[5].dayOfMonth}
            />
            <MobileHeaderItem
              label="S"
              value={weekData.days[6].dayOfMonth}
            />
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            <HeaderItem
              label="Sun"
              value={weekData.days[0].dayOfMonth}
            />
            <HeaderItem
              label="Mon"
              value={weekData.days[1].dayOfMonth}
            />
            <HeaderItem
              label="Tue"
              value={weekData.days[2].dayOfMonth}
            />
            <HeaderItem
              label="Wed"
              value={weekData.days[3].dayOfMonth}
            />
            <HeaderItem
              label="Thu"
              value={weekData.days[4].dayOfMonth}
            />
            <HeaderItem
              label="Fri"
              value={weekData.days[5].dayOfMonth}
            />
            <HeaderItem
              label="Sat"
              value={weekData.days[6].dayOfMonth}
            />
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
            >
              <div
                ref={containerOffset}
                className="row-end-1 h-7"
              ></div>
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  12AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  1AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  2AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  3AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  4AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  5AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  6AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  7AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  8AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  9AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  10AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  11AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  12PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  1PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  2PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  3PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  4PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  5PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  6PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  7PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  8PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  9PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  10PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  11PM
                </div>
              </div>
              <div />
            </div>

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
              <div className="col-start-8 row-span-full w-8" />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
              style={{
                gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
              }}
            >
              <li
                className="relative mt-px flex sm:col-start-3"
                style={{ gridRow: '74 / span 12' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                >
                  <p className="order-1 font-semibold text-blue-700">
                    Breakfast
                  </p>
                  <p className="text-blue-500 group-hover:text-blue-700">
                    <time dateTime="2022-01-12T06:00">6:00 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px flex sm:col-start-3"
                style={{ gridRow: '92 / span 30' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100"
                >
                  <p className="order-1 font-semibold text-pink-700">
                    Flight to Paris
                  </p>
                  <p className="text-pink-500 group-hover:text-pink-700">
                    <time dateTime="2022-01-12T07:30">7:30 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px hidden sm:col-start-6 sm:flex"
                style={{ gridRow: '122 / span 24' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs/5 hover:bg-gray-200"
                >
                  <p className="order-1 font-semibold text-gray-700">
                    Meeting with design team at Disney
                  </p>
                  <p className="text-gray-500 group-hover:text-gray-700">
                    <time dateTime="2022-01-15T10:00">10:00 AM</time>
                  </p>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
