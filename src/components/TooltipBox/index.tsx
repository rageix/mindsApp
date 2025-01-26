import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function TooltipBox({ children }: IProps) {
  return <div className="bg-white border border-gray-200 px-2 py-4 max-w-52 rounded-md">
    {children}
  </div>;
}
