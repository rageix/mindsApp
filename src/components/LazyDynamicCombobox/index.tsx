import { ChangeEvent, useEffect, useState } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import DynamicCombobox from '@/components/DynamicCombobox';

interface IProps<F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  onChange: (value: string | null) => void;
  isClearable?: boolean;
  options: ISelectOption<string>[];
  value?: string | null;
  onBlur?: () => void;
  placeholder?: string;
  debug?: boolean;
}

/***
 The difference between the LazyDynamicCombobox and the EZDynamicCombobox
 is the Lazy one allows you to enter your own value as well.
 ***/

export default function LazyDynamicCombobox<F>({
  field,
  errors,
  onChange,
  isClearable,
  options,
  value,
  onBlur,
  placeholder,
}: IProps<F>) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] =
    useState<ISelectOption<string>[]>(options);
  const [selectedOption, setSelectedOption] = useState<ISelectOption<string>>();

  useEffect(() => {
    const option = options.find((v) => v.value === value);

    if (option) {
      setSelectedOption(option);
      setInputValue(String(option?.label) || '');
      return;
    }

    setSelectedOption(undefined);
    if (value !== inputValue) {
      setInputValue(value || '');
    }
  }, [value]);

  // function onInputBlur() {
  //   if (selectedOption && inputValue !== selectedOption.label) {
  //     setInputValue(String(selectedOption.label));
  //   }
  // }

  function onClickClear() {
    setSelectedOption(undefined);
    setFilteredOptions(options);
    setInputValue('');
    onChange(null);
    if (onBlur) {
      onBlur();
    }
  }

  function onChangeSelected(option: ISelectOption<string> | null) {
    if (!option) {
      // setSelectedOption(undefined);
      // setInputValue('');
      // onChange(null);
      return;
    }
    setSelectedOption(option);
    setInputValue(String(option?.label) || '');
    onChange(option.value);
    if (onBlur) {
      onBlur();
    }
    // const re = new RegExp(String(value?.value), "i");
    // const result =  String(option.label).search(re);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    onChange(value);
    if (value.length > 0) {
      const re = new RegExp(event.target.value, 'i');
      setInputValue(value);
      const filteredOptions = options.filter(
        (v) => String(v.label).search(re) > -1,
      );

      if (filteredOptions.length === 0) {
        setFilteredOptions(options);
      } else {
        setFilteredOptions(filteredOptions);
      }

      return;
    }
    setInputValue(value);
    setFilteredOptions(options);
  }

  return (
    <DynamicCombobox<string, F>
      field={field}
      errors={errors}
      options={filteredOptions}
      value={selectedOption}
      onChange={onChangeSelected}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onInputBlur={onBlur}
      comparison={(value, option) => {
        return String(value?.value) === String(option.value);
      }}
      isClearable={isClearable}
      onClickClear={onClickClear}
      immediate
      placeholder={placeholder}
    />
  );
}
