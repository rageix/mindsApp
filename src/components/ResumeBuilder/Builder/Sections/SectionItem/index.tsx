'use client';
import { MutableRefObject, PropsWithChildren } from 'react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  dragRef?: MutableRefObject<any>;
  className?: string,
}

export default function SectionItem({ dragRef, className, children }: IProps) {
  return (
    <div
      ref={dragRef}
      className={cn('border border-gray-200 rounded-md p-3', className)}
    >
      {children}
    </div>
  );
}
