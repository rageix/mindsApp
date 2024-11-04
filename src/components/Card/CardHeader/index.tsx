import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function CardHeader({ children }: IProps) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
}
