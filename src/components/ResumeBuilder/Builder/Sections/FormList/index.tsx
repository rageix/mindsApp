import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function FormList({ children }: IProps) {
  return <div className="mt-3 flex flex-col space-y-3">{children}</div>;
}
