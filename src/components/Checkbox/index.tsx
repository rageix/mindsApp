import { cn } from '@/util/Cn';
import { InputHTMLAttributes, useMemo } from 'react';
import _ from 'lodash';

interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  field?: keyof T;
  errors?: Record<keyof T, string[]>;
}

export default function Checkbox<T>(props: Props<T>) {
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

  return (
    <input
      {...internal}
      {...props}
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded enabled:cursor-pointer',
        props.className ? props.className : '',
        props['aria-invalid']
          ? 'border-red-200  hover:border-red-200  checked:border-red-600 checked:bg-red-600'
          : 'border-gray-200 hover:border-gray-200 bg-white checked:border-blue-600 checked:bg-blue-600',
      )}
    />
  );
}
