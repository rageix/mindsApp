import { PropsWithChildren } from 'react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  className?: string;
}

export default function FormBlockBody({ className, children }: IProps) {
  return <div className={cn('col-span-full', className)}>{children}</div>;
}
