import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function Description({ children }: IProps) {
  return <div>{children}</div>;
}
