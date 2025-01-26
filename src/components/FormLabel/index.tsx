import { DetailedHTMLProps, LabelHTMLAttributes, useMemo } from 'react';
import { cn } from '@/util/Cn';

interface Props<T>
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  field?: keyof T;
  errors?: Record<keyof T, string[]>;
}

export default function FormLabel<T>(props: Props<T>) {
  const internal = useMemo(() => {
    if (props.field) {
      const field = String(props.field);
      return {
        htmlFor: field,
      };
    }
    return {};
  }, [props.field]);

  return (
    <label
      {...internal}
      {...props}
      className={cn(
        'block text-sm font-medium leading-6',
        props.className ? props.className : null,
        props['aria-invalid'] ? 'text-red-700' : null,
      )}
    >
      {props.children}
    </label>
  );
}
