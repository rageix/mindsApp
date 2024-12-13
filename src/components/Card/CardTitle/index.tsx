import { PropsWithChildren } from 'react';
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";
import useTheme from "@/hooks/UseTheme";

interface IProps extends PropsWithChildren {}

export default function CardTitle({ children }: IProps) {
  const theme = useTheme();

  return (
    <div className={cn('pe-3 text-base font-semibold leading-7',
      theme === ETheme.light ? 'text-gray-900' : null,
      theme === ETheme.dark ? 'text-white' : null,
      )}>
      {children}
    </div>
  );
}
