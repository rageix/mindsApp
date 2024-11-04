import { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
  h2: string | ReactElement;
  message: string | ReactElement;
}

export default function SuccessView(props: Props) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="px-6 sm:px-6 sm:py-32 lg:px-8 text-white">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {props.h2}
          </h2>
          <div className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
            {props.message}
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
