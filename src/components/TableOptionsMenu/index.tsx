import { PropsWithChildren } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from 'lucide-react';
import { cn } from '@/util/Cn';
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";

interface IProps extends PropsWithChildren {
  className?: string;
}

export default function TableOptionsMenu({ className, children }: IProps) {
  const theme = useTheme();

  return (
    <Menu
      as="div"
      className="flex justify-end ms-3"
    >
      <MenuButton
        className={cn('-m-2.5 block p-2.5 ',
          theme === ETheme.light ? 'text-gray-500 hover:text-gray-400 focus:ring-blue-600 focus-visible:outline-blue-600' : null,
          theme === ETheme.dark ? 'text-gray-400 hover:text-white' : null,
          )}
      >
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </MenuButton>
      <MenuItems
        transition
        className={cn(
          'absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in',
          className,
        )}
        anchor={{ to: 'bottom' }}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
