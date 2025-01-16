import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import * as react from 'react';
import { ForwardRefExoticComponent, PropsWithChildren, useMemo } from 'react';
import { TModalVariant } from '@/types/Variant';
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  LucideProps,
  XIcon,
} from 'lucide-react';
import { cn } from '@/util/Cn';

export type TModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const modalSizes: Record<TModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: '',
};

interface IIconSettings {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >;
  className: string;
}

interface Props extends PropsWithChildren {
  title: string;
  variant?: TModalVariant;
  size?: TModalSize;
  open: boolean;
  onClose: () => void;
  disableClose?: boolean;
}

export default function Modal({
  title,
  variant,
  size = 'sm',
  open,
  onClose,
  disableClose,
  children,
}: Props) {
  const iconSettings: IIconSettings | null = useMemo(() => {
    switch (variant) {
      case 'success':
        return {
          icon: CircleCheck,
          className: 'bg-green-100',
        };
      case 'warning':
        return {
          icon: CircleAlert,
          className: 'bg-yellow-100',
        };
      case 'danger':
        return {
          icon: CircleX,
          className: 'bg-red-100',
        };
    }

    return null;
  }, [variant]);

  return (
    <Dialog
      open={open}
      onClose={() => (disableClose ? null : onClose())}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-end justify-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={cn(
              'relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95',
              modalSizes[size],
            )}
          >
            {disableClose && (
              <div className="absolute right-3 top-3 text-gray-400 hover:text-white">
                <div
                  className="w-7 h-7 cursor-pointer"
                  onClick={onClose}
                >
                  <XIcon className="w-full h-full" />
                </div>
              </div>
            )}
            <div>
              {iconSettings && (
                <div
                  className={cn(
                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-3 sm:mb-5',
                    iconSettings.className,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  >
                    <iconSettings.icon />
                  </span>
                </div>
              )}
              <div>
                <DialogTitle
                  as="h3"
                  className="text-center text-base font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">{children}</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
