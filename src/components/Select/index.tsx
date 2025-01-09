import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { ISelectOption } from '@/types/SelectOption';
import { useMemo, useRef } from 'react';
import _ from 'lodash';
import { cn } from '@/util/Cn';
import useSize from '@/hooks/UseSize';
import Button from '@/components/Buttton';

interface IProps<T, F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  options: ISelectOption<T>[];
  value: ISelectOption<T> | undefined;
  onChange: (value: ISelectOption<T>) => void;
  onClickClear?: () => void;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  portal?: boolean;
  isClearable?: boolean;
  placeholder?: string;
}

export default function Select<T, F>({
  field,
  errors,
  options,
  value,
  onChange,
  onClickClear,
  disabled,
  className,
  buttonClassName,
  portal,
  isClearable,
  placeholder = 'Chose an option...',
}: IProps<T, F>) {
  const ref = useRef(null);
  const size = useSize(ref);

  const internal = useMemo(() => {
    if (field) {
      const fieldName = String(field);
      return {
        id: fieldName,
        name: fieldName,
        'data-testid': fieldName,
        'aria-describedby': fieldName + 'Errors',
        'aria-invalid': !_.isEmpty(errors?.[field]),
      };
    }
    return {};
  }, [field, errors]);

  return (
    <Listbox
      {...internal}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <div
        ref={ref}
        className={cn('relative', className)}
      >
        <ListboxButton
          as="div"
          className={cn(
            'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6',
            buttonClassName,
          )}
        >
          <span className={cn('block truncate', !value ? 'text-gray-400': '')}>
            {!value ? placeholder || '' : value?.label || ''}
          </span>
          <span className="absolute inset-y-0 right-0 flex">
            {isClearable && (
              <Button
                variant="custom"
                className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300"
                onClick={(e) => {
                  e?.preventDefault();
                  e?.stopPropagation();
                  if (onClickClear) {
                    onClickClear();
                  }
                }}
              >
                <span className="sr-only">Clear</span>
                <XIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Button>
            )}
            <span className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300">
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          anchor={{ to: 'bottom' }}
          style={{ width: size?.width }}
          portal={portal}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.key}
              value={option}
              className={cn(
                'group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white',
                value?.value === option.value ? 'bg-blue-600 text-white' : null,
              )}
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
