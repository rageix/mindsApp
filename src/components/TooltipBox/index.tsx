import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function TooltipBox({ children }: IProps) {
  return <div className="bg-gray-900 text-white border p-2 text-sm max-w-52 rounded-md mb-1">
    {children}
  </div>;
}
