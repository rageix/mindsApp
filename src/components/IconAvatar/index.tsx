import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function IconAvatar({ children }: IProps) {
  return (
    <div className="flex-shrink-0">
      <div className="inline-block h-10 w-10 rounded-full bg-white/5">
        {children}
      </div>
    </div>
  );
}
