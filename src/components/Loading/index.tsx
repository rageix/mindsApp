import { cn } from '@/util/Cn';
import { useEffect, useState } from 'react';

export type TLoadingDotSize = 'sm' | 'md' | 'lg';

const sizes: Record<TLoadingDotSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-4 w-4',
  lg: 'h-8 w-8',
};

const spacing: Record<TLoadingDotSize, string> = {
  sm: 'space-x-1',
  md: 'space-x-1.5',
  lg: 'space-x-2',
};

interface IProps {
  size?: TLoadingDotSize;
  showAfter?: number; // ms to wait before rendering
}

export default function Loading({ size = 'md', showAfter }: IProps) {
  const [show, setShow] = useState(!showAfter);

  useEffect(() => {
    if (showAfter) {
      setTimeout(() => setShow(true), showAfter);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className={cn('flex justify-center items-center', spacing[size])}>
      <span className="sr-only">Loading...</span>
      <div
        className={cn(
          'bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]',
          sizes[size],
        )}
      ></div>
      <div
        className={cn(
          'bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]',
          sizes[size],
        )}
      ></div>
      <div
        className={cn('bg-blue-600 rounded-full animate-bounce', sizes[size])}
      ></div>
    </div>
  );
}
