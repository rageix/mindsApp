import { PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { CircleHelp } from 'lucide-react';
// @ts-ignore
// shows error in ide but compiles fine
import type { AnchorProps } from '@headlessui/react/dist/internal/floating';

const DEBOUNCE = 100;

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  close: () => void;
  anchor?: AnchorProps;
  size?: number;
  icon?: ReactElement;
  buttonClassName?: string,
}

export default function PopoverHoverer({
  children,
  isOpen,
  anchor,
  size,
  close,
  icon = <CircleHelp size={size} />,
  buttonClassName,
}: IProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseEnter = () => {
    clear();
    if (!isOpen) {
      buttonRef.current?.click();
    }
  };

  const handleMouseLeave = () => {
    clear();

    timeoutRef.current = setTimeout(() => {
      close();
    }, DEBOUNCE);
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, [close]);

  return (
    <>
      {/* Ensure your custom component sets an `onClick` prop (even if it's a no-op function)
            otherwise `event.preventDefault()` will be called and default browser behaviour won't work
          @see https://github.com/tailwindlabs/headlessui/issues/3561 */}
      <PopoverButton
        // as={MyLinkComponent}
        // href="/"
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={buttonClassName}
      >
        {icon}
      </PopoverButton>

      <Transition show={isOpen}>
        <PopoverPanel
          anchor={anchor || 'top'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          portal={true}
          className="z-20"
        >
          {children}
        </PopoverPanel>
      </Transition>
    </>
  );
}