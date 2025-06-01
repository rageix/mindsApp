import { PropsWithChildren } from 'react';
import { DialogTitle } from '@headlessui/react';
import { XIcon } from 'lucide-react';

interface Props extends PropsWithChildren {
  onClose: () => void;
}

export default function DrawerTitle({ onClose, children }: Props) {
  return (
    <div className="px-4 sm:px-6">
      <div className="flex items-start justify-between">
        <DialogTitle className="text-base font-semibold text-gray-900">
          {children}
        </DialogTitle>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            onClick={onClose}
            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XIcon
              aria-hidden="true"
              className="size-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
