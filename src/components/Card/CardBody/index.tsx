import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/util/Cn';

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function CardBody(props: IProps) {
  return (
    <div
      {...props}
      className={cn('px-4 py-5 sm:p-6', props.className)}
    >
      {props.children}
    </div>
  );
}
