import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  heading: string;
  description: string;
}

export default function FormBlock({ heading, description, children }: IProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b-2 border-blue-600 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">{heading}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">{description}</p>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        {children}
      </div>
    </div>
  );
}
