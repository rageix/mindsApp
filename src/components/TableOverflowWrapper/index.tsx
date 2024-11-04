import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function TableOverflowWrapper({ children }: IProps) {
  return (
    <div className="max-w-full sm:max-w-6xl m-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        {/*<div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">*/}
        {/*  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">*/}
        {children}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
