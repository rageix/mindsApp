import { cn } from '@/util/Cn';
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { MenuItem } from "@headlessui/react";

interface IProps extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const MenuItemButton = forwardRef(function MenuItemButton(
  props: IProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { className, disabled, onClick, children } = props;
  return (
    <MenuItem>
    <button
      ref={ref}
      type="button"
      className={cn(
        'block px-3 py-1 text-sm leading-6 w-full text-left font-normal text-gray-900 data-[focus]:bg-sky-600 data-[focus]:text-white cursor-pointer',
        disabled ? 'text-gray-400' : null,
        className ? className : null,
      )}
      onClick={onClick}
    >
      {children}
    </button>
    </MenuItem>
  );
});

export default MenuItemButton;
