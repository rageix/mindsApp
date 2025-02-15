import { MenuItem } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  className?: string;
}

export default function CurrentUserAvatarMenuItem({
  className,
  children,
}: IProps) {

  return (
    <MenuItem>
      <div
        className={cn(
          'block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white cursor-pointer',
          className,
        )}
      >
        {children}
      </div>
    </MenuItem>
  );
}
