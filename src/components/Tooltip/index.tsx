import { Popover } from '@headlessui/react';
import PopoverHoverer from '@/components/Tooltip/PopoverHoverer';
import { PropsWithChildren, ReactElement } from 'react';
// @ts-ignore
// shows error in ide but compiles fine
import type { AnchorProps } from '@headlessui/react/dist/internal/floating';

interface IProps extends PropsWithChildren {
  anchor?: AnchorProps;
  size?: number;
  icon?: ReactElement;
  buttonClassName?: string;
  className?: string;
}

export default function Tooltip({
  anchor,
  size,
  icon,
  buttonClassName,
  className,
  children,
}: IProps) {
  return (
    <Popover className={className}>
      {({ open, close }) => (
        <PopoverHoverer
          isOpen={open}
          close={close}
          anchor={anchor}
          size={size}
          icon={icon}
          buttonClassName={buttonClassName}
        >
          {children}
        </PopoverHoverer>
      )}
    </Popover>
  );
}
