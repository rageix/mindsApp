import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function DrawerBody({ children }: Props) {
  return <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>;
}
