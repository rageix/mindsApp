import { cn } from '@/util/Cn';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
  'aria-invalid'?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export default function FormLink(props: Props) {
  return (
    <Link
      {...props}
      className={cn(
        'font-semibold leading-6',
        props.className,
        props['aria-invalid']
          ? 'text-red-400 hover:text-red-300'
          : 'text-blue-400 hover:text-blue-300',
      )}
    >
      {props.children}
    </Link>
  );
}
