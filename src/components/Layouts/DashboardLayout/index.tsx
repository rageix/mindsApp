'use client';
import { PropsWithChildren, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import CurrentUserAvatar from '@/components/CurrentUserAvatar';
import useAuthentication from '@/hooks/UseAuthentication';

interface Props extends PropsWithChildren {}

export default function DashboardLayout({ children }: Props) {
  const authController = useAuthentication();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authController.isLoaded()) {
    return null;
  }

  return (
    <div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            <Sidebar className="ring-1 ring-white/10" />
          </DialogPanel>
        </div>
      </Dialog>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-gray-500/10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-blue-200 hover:text-white lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </button>
          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-700 lg:hidden"
          />
          <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
            {/*<SearchBar />*/}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-700"
              />
              <CurrentUserAvatar />
            </div>
          </div>
        </div>
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
