import { PropsWithChildren } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

interface Props extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export default function Drawer({ open, onClose, children }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
