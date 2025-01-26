import { PropsWithChildren } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from 'lucide-react';
import { cn } from '@/util/Cn';
// import useTheme from '@/hooks/UseTheme';
import Button from '@/components/Buttton';

interface IProps extends PropsWithChildren {
  className?: string;
  buttonClassName?: string;
}

export default function TableOptionsMenu({
  className,
  buttonClassName,
  children,
}: IProps) {
  // const theme = useTheme();

  return (
    <Menu
      as="div"
      className="flex justify-end"
    >
      <MenuButton
        as="div"
        // className={cn('-m-2.5 block p-2.5 ',
        //   theme === ETheme.light ? 'text-gray-500 hover:text-gray-400 focus:ring-blue-600 focus-visible:outline-blue-600 hover:bg-blue-100' : null,
        //   theme === ETheme.dark ? 'text-gray-400 hover:text-white' : null,
        //   )}
      >
        <Button
          variant="link"
          className={cn('text-gray-500 hover:text-gray-400', buttonClassName)}
          label="Open options"
        >
          <EllipsisVerticalIcon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </Button>
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
