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
        'block w-full rounded-md bg-gray-100 px-4 py-2 text-xl text-gray-900  ring-gray-300 focus:ring-2 focus:ring-inset ring-inset placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 !border-none',
        props.disabled ? '!bg-gray-300 !text-gray-500': null,
        props.className,
      )}
    />
  );
}
