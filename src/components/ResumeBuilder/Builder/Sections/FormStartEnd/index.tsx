import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function FormStartEnd({ children }: IProps) {
  return <div className="flex-1 flex gap-x-4">{children}</div>;
}
