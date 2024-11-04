'use client';

import { ICalItem } from '@/components/VirtualCards/types';

interface IProps {
  item: ICalItem;
}

export default function CalendarItem({ item }: IProps) {
  return (
    <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 bg-white hover:bg-gray-300 cursor-pointer">
      <div className="flex-auto">
        <p className="text-lg text-gray-900 text-center">{item?.label}</p>
      </div>
      {/*<Menu*/}
      {/*  as="div"*/}
      {/*  className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    <MenuButton className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">*/}
      {/*      <span className="sr-only">Open options</span>*/}
      {/*      <EllipsisVerticalIcon*/}
      {/*        className="h-6 w-6"*/}
      {/*        aria-hidden="true"*/}
      {/*      />*/}
      {/*    </MenuButton>*/}
      {/*  </div>*/}

      {/*  <MenuItems*/}
      {/*    transition*/}
      {/*    className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"*/}
      {/*  >*/}
      {/*    <div className="py-1">*/}
      {/*      <MenuItem>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"*/}
      {/*        >*/}
      {/*          Edit*/}
      {/*        </a>*/}
      {/*      </MenuItem>*/}
      {/*      <MenuItem>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"*/}
      {/*        >*/}
      {/*          Cancel*/}
      {/*        </a>*/}
      {/*      </MenuItem>*/}
      {/*    </div>*/}
      {/*  </MenuItems>*/}
      {/*</Menu>*/}
    </li>
  );
}
