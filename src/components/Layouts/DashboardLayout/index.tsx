'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { MenuIcon, XIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import subscriptionService from '@/services/SubscriptionService';
import userService from '@/services/UserService';
import useUser from '@/hooks/UseUser';

interface Props extends PropsWithChildren {}

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptionServiceController] = useState(subscriptionService);
  subscriptionServiceController.useController();
  const [controller] = useState(userService);
  controller.useController();
  const user = useUser();
  const [_isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigation = useMemo(() => {
  //   return navItems.map((v) => {
  //     v.current = path.indexOf(v.href) === 0;
  //     return v;
  //   });
  // }, [path]);

  useEffect(() => {
    setIsLoggedIn(user.isLoggedIn());
  }, [user.isLoggedIn()]);

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
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-blue-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon
            aria-hidden="true"
            className="size-6"
          />
        </button>
      </div>
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
