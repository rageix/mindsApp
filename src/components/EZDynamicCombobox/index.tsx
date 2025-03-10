import { ChangeEvent, useEffect, useState } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import DynamicCombobox from '@/components/DynamicCombobox';

interface IProps<T, F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  onChange: (value: T | null) => void;
  clearable?: boolean;
  options: ISelectOption<T>[];
  value?: T | null;
}

export default function EZDynamicCombobox<T, F>({
  field,
  errors,
  onChange,
  clearable,
  options,
  value,
}: IProps<T, F>) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] =
    useState<ISelectOption<T>[]>(options);
  const [selectedOption, setSelectedOption] = useState<ISelectOption<T>>();

  useEffect(() => {
    const option = options.find((v) => v.value === value);

    if (option) {
      setSelectedOption(option);
      setInputValue(String(option?.label) || '');
      return;
    }

    setSelectedOption(undefined);
    setInputValue('');
  }, [value]);

  function onInputBlur() {
    if (selectedOption && inputValue !== selectedOption.label) {
      setInputValue(String(selectedOption.label));
    }
  }

  function onClickClear() {
    setSelectedOption(undefined);
    setFilteredOptions(options);
    setInputValue('');
    onChange(null);
  }

  function onChangeSelected(option: ISelectOption<T> | null) {
    if (!option) {
      // setSelectedOption(undefined);
      // setInputValue('');
      // onChange(null);
      return;
    }
    setSelectedOption(option);
    setInputValue(String(option?.label) || '');
    onChange(option.value);
    // const re = new RegExp(String(value?.value), "i");
    // const result =  String(option.label).search(re);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    if (value.length > 0) {
      const re = new RegExp(event.target.value, 'i');
      setInputValue(value);
      setFilteredOptions(
        options.filter((v) => String(v.label).search(re) > -1),
      );
      return;
    }
    setInputValue(value);
    setFilteredOptions(options);
  }

  return (
    <DynamicCombobox<T, F>
      field={field}
      errors={errors}
      options={filteredOptions}
      value={selectedOption}
      onChange={onChangeSelected}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onInputBlur={onInputBlur}
      comparison={(value, option) => {
        return String(value?.value) === String(option.value);
      }}
      isClearable={clearable}
      onClickClear={onClickClear}
      immediate
    />
  );
}
