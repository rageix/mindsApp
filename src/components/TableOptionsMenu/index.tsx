import { PropsWithChildren } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from 'lucide-react';

interface IProps extends PropsWithChildren {}

export default function TableOptionsMenu({ children }: IProps) {
  return (
    <Menu
      as="div"
      className="flex justify-end"
    >
      <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-white">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        anchor={{ to: 'bottom' }}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
