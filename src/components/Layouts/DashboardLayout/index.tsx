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
import subscriptionService from '@/services/SubscriptionService';
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface Props extends PropsWithChildren {}

export default function DashboardLayout({ children }: Props) {
  subscriptionService.useController();
  const authController = useAuthentication();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();

  if (!authController.isLoaded()) {
    return null;
  }

  return (
    <div className={'min-h-screen'}>
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
        <div
          className={cn(
            'sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8',
            theme === ETheme.light ? 'bg-white' : null,
            theme === ETheme.dark ? 'bg-gray-800' : null,
          )}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={cn(
              '-m-2.5 p-2.5  lg:hidden',
              theme === ETheme.light
                ? 'text-gray-900 hover:text-gray-800'
                : null,
              theme === ETheme.dark ? 'text-white hover:text-white-100' : null,
            )}
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
            className={cn(
              'h-6 w-px lg:hidden',
              theme === ETheme.light ? 'bg-gray-200' : null,
              theme === ETheme.dark ? 'bg-gray-700' : null,
            )}
          />
          <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
            {/*<SearchBar />*/}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeSwitcher/>
              <button
                type="button"
                className={cn(
                  '-m-2.5 p-2.5 hover:text-gray-500',
                  theme === ETheme.light
                    ? 'text-gray-500 hover:text-gray-400'
                    : null,
                  theme === ETheme.dark
                    ? 'text-gray-400 hover:text-gray-300'
                    : null,
                )}
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
                className={cn(
                  'hidden lg:block lg:h-6 lg:w-px',
                  theme === ETheme.light ? 'bg-gray-200' : null,
                  theme === ETheme.dark ? 'bg-gray-700' : null,
                )}
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
