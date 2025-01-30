import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  PropsWithChildren,
} from 'react';
import { cn } from '@/util/Cn';

interface IProps
  extends DetailedHTMLProps<
      FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    PropsWithChildren {}

export default function Form(props: IProps) {
  return (
    <form
      {...props}
      className={cn('space-y-2', props.className)}
    >
      {props.children}
    </form>
  );
}
