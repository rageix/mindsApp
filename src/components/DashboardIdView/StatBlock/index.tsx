'use client';

import { ReactElement } from "react";
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps {
  label: string;
  value: string | number | ReactElement;
}

export default function StatBlock({ label, value }: IProps) {
  const theme = useTheme();

  return (
    <div>
      <p className={cn('text-sm/6 font-medium text-gray-500',
        theme === ETheme.light ? 'text-gray-500' : null,
        theme === ETheme.dark ? 'text-gray-400' : null,
        )}>{label}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
      </p>
    </div>
  );
}
