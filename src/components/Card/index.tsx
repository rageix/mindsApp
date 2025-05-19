import { PropsWithChildren } from 'react';
import { TSizeVariant } from '@/types/Variant';
import { cn } from '@/util/Cn';
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";

interface IProps extends PropsWithChildren {
  rounded?: TSizeVariant;
  className?: string;
}

export default function Card({ rounded = 'lg', className, children }: IProps) {
  const theme = useTheme();

  return (
    <div className="h-full">
    <div
      className={cn(
        'divide-y overflow-hidden border border-gray-200',
        theme === ETheme.light ? 'divide-gray-200 bg-white' : null,
        theme === ETheme.dark ? 'divide-gray-500 bg-gray-800' : null,
        rounded === 'md' ? 'rounded-md' : null,
        rounded === 'lg' ? 'rounded-lg' : null,
        rounded === '2xl' ? 'rounded-2xl' : null,
        className,
      )}
    >
      {children}
    </div>
    </div>
  );
}
