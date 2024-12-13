import { PropsWithChildren } from 'react';
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps extends PropsWithChildren {
  title: string;
  description: string;
}

export default function FormBlock({ title, description, children }: IProps) {
  const theme = useTheme();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b-2 border-blue-600 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">{title}</h2>
        <p className={cn('mt-1 text-sm leading-6',
          theme === ETheme.light ? 'text-gray-500' : null,
          theme === ETheme.dark ? 'text-gray-400' : null,
          )}>{description}</p>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        {children}
      </div>
    </div>
  );
}
