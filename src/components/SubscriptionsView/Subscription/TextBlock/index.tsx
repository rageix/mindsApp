'use client';
import { PropsWithChildren, ReactElement } from 'react';
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";
import { cn } from "@/util/Cn";

interface IProps extends PropsWithChildren {
  title: ReactElement | string;
}

export default function TextBlock({ title, children }: IProps) {
  const theme = useTheme();

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className={cn('text-sm/6 font-medium ',
        theme === ETheme.light ? 'text-gray-900' : null,
        theme === ETheme.dark ? 'text-white' : null,
        )}>{title}</dt>
      <dd className={cn("mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0",
        theme === ETheme.light ? 'text-gray-500' : null,
        theme === ETheme.dark ? 'text-gray-400' : null,
        )}>
        {children}
      </dd>
    </div>
  );
}
