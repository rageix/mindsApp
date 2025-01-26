import { Popover } from '@headlessui/react';
import PopoverHoverer from '@/components/Tooltip/PopoverHoverer';
import { PropsWithChildren } from 'react';
// @ts-ignore
// shows error in ide but compiles fine
import type { AnchorProps } from '@headlessui/react/dist/internal/floating';

interface IProps extends PropsWithChildren {
  anchor?: AnchorProps;
  size?: number
}

export default function Tooltip({ anchor, size, children }: IProps) {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <PopoverHoverer
          isOpen={open}
          close={close}
          anchor={anchor}
          size={size}
        >
          {children}
        </PopoverHoverer>
      )}
    </Popover>
  );
}
