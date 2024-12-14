import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { PropsWithChildren } from 'react';
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function FormDrawer({ open, onClose, title, children }: IProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"

            >
              <div
                className={
                  cn('flex h-full flex-col overflow-y-scroll py-6 shadow-xl',
                    theme === ETheme.light ? 'bg-white text-gray-900' : null,
                    theme === ETheme.dark ? 'bg-gray-800' : null,)
                }
              >
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold">
                      {title}
                    </DialogTitle>
                    {/*<div className="ml-3 flex h-7 items-center">*/}
                    {/*  <button*/}
                    {/*    type="button"*/}
                    {/*    onClick={onClose}*/}
                    {/*    className="relative rounded-md bg-gray-700 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                    {/*  >*/}
                    {/*    <span className="absolute -inset-2.5" />*/}
                    {/*    <span className="sr-only">Close panel</span>*/}
                    {/*    <XIcon*/}
                    {/*      aria-hidden="true"*/}
                    {/*      className="size-6"*/}
                    {/*    />*/}
                    {/*  </button>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
