import { PropsWithChildren } from 'react';
import { TSizeVariant } from '@/types/Variant';
import { cn } from '@/util/Cn';

const sizes: Record<TSizeVariant, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

interface IProps extends PropsWithChildren {
  size: TSizeVariant;
}

export default function Container({ size, children }: IProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className={cn('mx-auto', sizes[size])}>{children}</div>
    </div>
  );
}
