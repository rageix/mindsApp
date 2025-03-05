import { cn } from '@/util/Cn';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
  'aria-invalid'?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export default function InlineLink(props: Props) {
  const theme = useTheme();

  return (
    <Link
      {...props}
      className={cn(
        'font-semibold leading-6',
        props.className,
        props['aria-invalid'] ? '!text-red-400 !hover:text-red-300': null,
        theme === ETheme.light ? 'text-blue-600 hover:text-blue-600' : null,
        theme === ETheme.dark ? 'text-blue-400 hover:text-blue-300' : null,
      )}
    >
      {props.children}
    </Link>
  );
}
