import { DetailedHTMLProps, InputHTMLAttributes, useMemo } from 'react';
import { cn } from '@/util/Cn';
import _ from 'lodash';
import Button from '@/components/Buttton';
import { XIcon } from 'lucide-react';

interface Props<T>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field?: keyof T;
  errors?: Record<keyof T, string[]>;
  isClearable?: boolean;
  onClear?: () => void;
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
    delete newProps.isClearable;
    delete newProps.onClear;

    return newProps;
  }, [props]);

  return (
    <div className="relative">
      <input
        {...internal}
        {...newProps}
        className={cn(
          'block w-full rounded-md bg-gray-100 px-4 py-2 text-xl text-gray-900 placeholder:text-gray-400 outline-0 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600',
          props.disabled ? '!bg-gray-300 !text-gray-500' : null,
          props.isClearable ? '!pr-10' : null,
          props.className,
        )}
      />
      {props.isClearable && (
        <div className="absolute inset-y-0 right-0 flex">
          <Button
            variant="custom"
            className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300 cursor-pointer focus:ring-blue-600 focus-visible:outline-blue-600"
            onClick={props.onClear}
            onKeyDown={(e) => e?.stopPropagation()}
          >
            <span className="sr-only">Clear</span>
            <XIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Button>
        </div>
      )}
    </div>
  );
}
