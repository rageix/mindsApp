'use client';
import { PropsWithChildren } from 'react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  isExpanded: boolean;
}

export default function SectionItemBody({ isExpanded, children }: IProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-2 mt-3',
        !isExpanded ? 'hidden' : null,
      )}
    >
      {children}
    </div>
  );
}
