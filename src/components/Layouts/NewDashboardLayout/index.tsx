'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from 'lucide-react';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { cn } from '@/util/Cn';
import Logo from '@/components/Logo';
import LogoSmall from '@/components/LogoSmall';
import CurrentUserAvatar from '@/components/CurrentUserAvatar';
import { usePathname } from 'next/navigation';
import useUser from '@/hooks/UseUser';
import LoginButton from '@/components/LoginButton';
import userService from '@/services/UserService';
import subscriptionService from '@/services/SubscriptionService';

const navItems = [
  // { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'My Resumes', href: '/dashboard/resumes', current: false },
];

interface Props extends PropsWithChildren {}

export default function NewDashboardLayout(props: Props) {
  const [subscriptionServiceController] = useState(subscriptionService);
  subscriptionServiceController.useController();
  const [controller] = useState(userService);
  controller.useController();
  const path = usePathname();
  const user = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useMemo(() => {
    return navItems.map((v) => {
      v.current = path.indexOf(v.href) === 0;
      return v;
    });
  }, [path]);

  useEffect(() => {
    setIsLoggedIn(user.isLoggedIn());
  }, [user.isLoggedIn()]);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="border-b border-gray-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  {/*<img*/}
                  {/*  alt="Your Company"*/}
                  {/*  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                  {/*  className="block h-8 w-auto lg:hidden"*/}
                  {/*/>*/}
                  {/*<img*/}
                  {/*  alt="Your Company"*/}
                  {/*  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                  {/*  className="hidden h-8 w-auto lg:block"*/}
                  {/*/>*/}
                  <Logo className="hidden h-8 w-auto lg:block" />
                  <LogoSmall className="block h-8 w-auto lg:hidden" />
                </div>
                {isLoggedIn && (
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={cn(
                          item.current
                            ? 'border-blue-600 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    aria-hidden="true"
                    className="size-6"
                  />
                </button>
                {/* Profile dropdown */}
                <div className="ml-3">
                  {!isLoggedIn && <LoginButton />}
                  {isLoggedIn && <CurrentUserAvatar />}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            {isLoggedIn && (
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={cn(
                      item.current
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            )}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                {/*<div className="shrink-0">*/}
                {/*  <img*/}
                {/*    alt=""*/}
                {/*    src={user.imageUrl}*/}
                {/*    className="size-10 rounded-full"*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="ml-3">*/}
                {/*  <div className="text-base font-medium text-gray-800">*/}
                {/*    {user.name}*/}
                {/*  </div>*/}
                {/*  <div className="text-sm font-medium text-gray-500">*/}
                {/*    {user.email}*/}
                {/*  </div>*/}
                {/*</div>*/}
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    aria-hidden="true"
                    className="size-6"
                  />
                </button>
                <div className="ml-3">
                  {!isLoggedIn && <LoginButton />}
                  {isLoggedIn && <CurrentUserAvatar />}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {/*{userNavigation.map((item) => (*/}
                {/*  <DisclosureButton*/}
                {/*    key={item.name}*/}
                {/*    as="a"*/}
                {/*    href={item.href}*/}
                {/*    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"*/}
                {/*  >*/}
                {/*    {item.name}*/}
                {/*  </DisclosureButton>*/}
                {/*))}*/}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="">
          {/*<header>*/}
          {/*  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">*/}
          {/*    <h1 className="text-3xl font-bold tracking-tight text-gray-900">*/}
          {/*      Dashboard*/}
          {/*    </h1>*/}
          {/*  </div>*/}
          {/*</header>*/}
          <main>
            {/*<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">*/}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
