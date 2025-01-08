import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function Title({ children }: IProps) {
  return <div>{children}</div>;
}
