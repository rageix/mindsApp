import { ISelectOption } from '@/types/SelectOption';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';
import { useMemo } from 'react';
import Select from '@/components/Select';

interface IProps<T> {
  options: ISelectOption<T>[],
  value: T,
  onChange: (option: ISelectOption<T>) => void,
}

export default function Tabs<T>({ options, value, onChange }: IProps<T>) {
  const selected = useMemo(
    () => options.find((v) => v.value === value),
    [value],
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <Select<T, unknown>
          options={options}
          value={selected || null}
          onChange={onChange}
        />
      </div>
      <div className="hidden sm:block">
        <nav
          aria-label="Tabs"
          className="flex "
        >
          {options.map((v) => (
            <Button
              key={v.key}
              variant="gray"
              className={cn(
                value === v.value
                  ? '!bg-gray-500': null,
                // 'rounded-md px-3 py-2 text-sm font-medium',
              )}
              onClick={() => onChange(v)}
            >
              {v.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
