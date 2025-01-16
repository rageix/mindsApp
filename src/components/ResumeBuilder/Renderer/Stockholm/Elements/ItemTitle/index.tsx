import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function ItemTitle({ children }: IProps) {
  return <h3>{children}</h3>;
}
