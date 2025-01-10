'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';

interface Props extends PropsWithChildren {}

export default function OuterPageWrapper({ children }: Props) {
  const theme = useTheme();
  // this prevents hydration by forcing everything to properly load client side
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if(loading) {
    return null;
  }

  return (
    <div
      className={cn(
        'min-h-screen',
        theme === ETheme.light ? 'bg-white text-gray-900' : null,
        theme === ETheme.dark ? 'bg-gray-900 text-white' : null,
      )}
    >
      {children}
    </div>
  );
}
