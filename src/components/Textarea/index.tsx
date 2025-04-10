'use client';
import { DetailedHTMLProps, TextareaHTMLAttributes, useMemo } from 'react';
import { cn } from '@/util/Cn';
import _ from 'lodash';

interface Props<T>
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  field?: keyof T;
  errors?: Record<keyof T, string[]>;
  defaultClassName?: string;
}

export default function Textarea<T>(props: Props<T>) {
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
    delete newProps.defaultClassName;

    return newProps;
  }, [props]);

  return (
    <textarea
      {...internal}
      {...newProps}
      className={cn(
        props.defaultClassName
          ? props.defaultClassName
          : 'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6',
        props.className,
      )}
    />
  );
}
