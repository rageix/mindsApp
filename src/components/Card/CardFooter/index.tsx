import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function CardFooter({ children }: IProps) {
  return <div className="px-4 py-4 sm:px-6">{children}</div>;
}
