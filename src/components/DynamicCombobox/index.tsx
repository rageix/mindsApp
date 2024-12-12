import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { ISelectOption } from '@/types/SelectOption';
import { ChangeEvent, FocusEventHandler, useMemo, useRef } from 'react';
import _ from 'lodash';
import { cn } from '@/util/Cn';
import useSize from '@/hooks/UseSize';

interface IProps<T, F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  options: ISelectOption<T>[];
  value: ISelectOption<T> | undefined;
  onChange: (value: ISelectOption<T> | null) => void;
  disabled?: boolean;
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInputBlur?: FocusEventHandler<HTMLInputElement>;
  comparison: (
    value: ISelectOption<T> | undefined,
    option: ISelectOption<T>,
  ) => boolean;
  clearable?: boolean;
  onClickClear?: () => void;
  placeholder?: string;
  immediate?: boolean;
}

export default function DynamicCombobox<T, F>({
  field,
  errors,
  options,
  value,
  onChange,
  disabled,
  inputValue,
  onInputChange,
  onInputBlur,
  comparison,
  clearable,
  onClickClear,
  placeholder = 'Select a value...',
  immediate
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
    <Combobox
      {...internal}
      as="div"
      value={value || null}
      onChange={onChange}
      disabled={disabled}
      immediate={immediate}
    >
      <div
        ref={ref}
        className="relative mt-2"
      >
        <ComboboxInput<ISelectOption<T>>
          className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 placeholder:text-gray-400 bg-white"
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex">
          {clearable && (
            <div
              className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300 cursor-pointer"
              onClick={() => (onClickClear ? onClickClear() : undefined)}
            >
              <XIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>
          )}
          <ComboboxButton className="flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 hover:text-gray-300">
            <ChevronDownIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          anchor={{ to: 'bottom' }}
          style={{ width: size?.width }}
        >
          {(options || []).map((option) => (
            <ComboboxOption
              key={option.key}
              value={option}
              className={cn(
                'group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-600 data-[focus]:text-white',
                comparison(value, option) ? '!bg-blue-600 !text-white' : null,
              )}
            >
              <span className="block truncate group-data-[selected]:font-semibold">
                {option.label}
              </span>
            </ComboboxOption>
          ))}
          {(options || []).length === 0 && (
            <div
              className={
                'group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-600 data-[focus]:text-white'
              }
            >
              <span className="block truncate group-data-[selected]:font-semibold">
                No results found
              </span>
            </div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
