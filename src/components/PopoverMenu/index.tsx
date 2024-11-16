import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import { cn } from '@/util/Cn';

interface IProps<T> extends PropsWithChildren {
  options: ISelectOption<T>[];
  onClick: (option: ISelectOption<T>) => void;
  className?: string;
}

export default function PopoverMenu<T>({
  options,
  onClick,
  className,
  children, // the clickable/button element that shows that triggers showing
}: IProps<T>) {
  return (
    <Menu
      as="div"
      className={cn('relative', className)}
    >
      <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open menu</span>
        {children}
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {options.map((v) => (
          <div key={v.key}>
            <MenuItem>
              <button
                type="button"
                // href="#"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                onClick={() => onClick(v)}
              >
                {v.label}
              </button>
            </MenuItem>
          </div>
        ))}
      </MenuItems>
    </Menu>
  );
}
