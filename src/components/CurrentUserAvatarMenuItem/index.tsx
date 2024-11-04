import { MenuItem } from '@headlessui/react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/util/Cn';

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function CurrentUserAvatarMenuItem(props: IProps) {
  return (
    <MenuItem>
      <div
        {...props}
        className={cn(
          'block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 cursor-pointer',
          props.className,
        )}
      >
        {props.children}
      </div>
    </MenuItem>
  );
}
