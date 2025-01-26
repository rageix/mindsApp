import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function FormRow({ children }: IProps) {
  return <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2">{children}</div>;
}
