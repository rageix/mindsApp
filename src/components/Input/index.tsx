import { DetailedHTMLProps, InputHTMLAttributes, useMemo } from 'react';
import { cn } from '@/util/Cn';
import _ from 'lodash';

interface Props<T>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field?: keyof T;
  errors?: Record<keyof T, string[]>;
}

export default function Input<T>(props: Props<T>) {
  const internal = useMemo(() => {
    if (props.field) {
      const field = String(props.field);
      return {
        id: field,
        name: field,
        'data-testid': field,
        'aria-describedby': field + 'Errors',
        'aria-invalid': !_.isEmpty(props?.errors?.[props.field]),
      };
    }
    return {};
  }, [props.field, props.errors]);

  const newProps = useMemo(() => {
    const newProps = {
      ...props,
    };

    delete newProps.field;
    delete newProps.errors;

    return newProps;
  }, [props]);

  return (
    <input
      {...internal}
      {...newProps}
      className={cn(
        'block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 mt-2 placeholder:text-gray-400 bg-gray-900/80',
        props.className,
      )}
    />
  );
}
