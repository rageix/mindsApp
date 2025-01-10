import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function Description({ children }: IProps) {
  return <div className="text-gray-500 text-sm">{children}</div>;
}
