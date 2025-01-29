'use client';
import { Disclosure } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import Logo from '@/components/Logo';
import LogoSmall from '@/components/LogoSmall';

interface Props extends PropsWithChildren {}

export default function MinimalLayout(props: Props) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="border-b border-gray-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Logo className="hidden h-8 w-auto lg:block" />
                  <LogoSmall className="block h-8 w-auto lg:hidden" />
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <div>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
