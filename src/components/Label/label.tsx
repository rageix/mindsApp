import { LabelHTMLAttributes } from 'react';
import { cn } from '@/util/Cn';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label(props: Props) {
  return (
    <label
      {...props}
      className={cn(
        'text-sm leading-6',
        props.className ? props.className : '',
        props['aria-invalid'] ? 'text-red-400' : 'text-gray-400',
      )}
    ></label>
  );
}
