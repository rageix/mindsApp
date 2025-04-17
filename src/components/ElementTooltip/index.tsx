import { Popover } from '@headlessui/react';
import PopoverHoverer from '@/components/ElementTooltip/PopoverHoverer';
import { PropsWithChildren, ReactElement } from 'react';
// @ts-ignore
// shows error in ide but compiles fine
import type { AnchorProps } from '@headlessui/react/dist/internal/floating';

interface IProps extends PropsWithChildren {
  tooltip?: ReactElement | string;
  anchor?: AnchorProps;
  size?: number;
  icon?: ReactElement;
  buttonClassName?: string;
  className?: string;
}

export default function ElementTooltip({
  tooltip,
  anchor,
  buttonClassName,
  className,
  children,
}: IProps) {
  return (
    <Popover className={className}>
      {({ open, close }) => (
        <PopoverHoverer
          tooltip={tooltip}
          isOpen={open}
          close={close}
          anchor={anchor}
          buttonClassName={buttonClassName}
        >
          {children}
        </PopoverHoverer>
      )}
    </Popover>
  );
}
