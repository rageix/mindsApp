'use client';
import { PropsWithChildren } from 'react';
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';

interface Props extends PropsWithChildren {}

export default function OuterPageWrapper({ children }: Props) {
  const theme = useTheme();

  return (
    <div
      className={cn(
        'min-h-screen',
        theme === ETheme.light ? 'bg-gray-200 text-gray-900' : null,
        theme === ETheme.dark ? 'bg-gray-900 text-white' : null,
      )}
    >
      {children}
    </div>
  );
}
