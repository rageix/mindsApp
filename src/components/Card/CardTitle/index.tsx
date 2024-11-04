import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function CardTitle({ children }: IProps) {
  return (
    <div className="pe-3 text-base font-semibold leading-7 text-white">
      {children}
    </div>
  );
}
