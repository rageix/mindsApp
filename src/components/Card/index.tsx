import { PropsWithChildren } from 'react';
import { TSizeVariant } from '@/types/Variant';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  rounded?: TSizeVariant;
  className?: string;
}

export default function Card({ rounded = 'lg', className, children }: IProps) {
  return (
    <div
      className={cn(
        'divide-y divide-gray-500 overflow-hidden bg-gray-800 shadow',
        rounded === 'md' ? 'rounded-md' : null,
        rounded === 'lg' ? 'rounded-lg' : null,
        rounded === '2xl' ? 'rounded-2xl' : null,
        className,
      )}
    >
      {children}
    </div>
  );
}
