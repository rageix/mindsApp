import { cn } from '@/util/Cn';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface Props extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function FormLink(props: Props) {
  return (
    <Link
      {...props}
      className={cn(
        'font-semibold leading-6',
        props.className ? props.className : '',
        props['aria-invalid']
          ? 'text-red-400 hover:text-red-300'
          : 'text-blue-400 hover:text-blue-300',
      )}
    ></Link>
  );
}
