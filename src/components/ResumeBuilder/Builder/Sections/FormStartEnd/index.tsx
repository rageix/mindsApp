import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function FormStartEnd({ children }: IProps) {
  return <div className="flex gap-x-2">{children}</div>;
}
