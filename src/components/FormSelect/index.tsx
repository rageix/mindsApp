import { MongoId } from '@/types/MongoDocument';
import { useEffect, useState } from 'react';
import useTeamId from '@/hooks/UseTeamId';
import { ISelectOption } from '@/types/SelectOption';
import DynamicCombobox from '@/components/DynamicCombobox';
import { IHasId } from '@/types/HasId';
import { useDebounce } from 'use-debounce';
import { IForm } from '@/types/Form';
import FormItem from '@/components/FormSelect/FormItem';
import useForms from '@/hooks/UseForms';
import { postApiFormsFindOne } from '@/requests/api/forms/findOne';

function makeOption(form: IHasId<IForm>): ISelectOption<IHasId<IForm>> {
  return {
    key: String(form._id),
    value: form,
    label: <FormItem value={form} />,
  };
}

interface IProps<F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  onChange: (_id: MongoId | null) => void;
  value?: MongoId | null;
  clearable?: boolean;
}

export default function FormSelect<F>({
  field,
  errors,
  onChange,
  value,
  clearable,
}: IProps<F>) {
  const [inputValue, setInputValue] = useState('');
  const [text] = useDebounce(inputValue, 400);
  const [options, setOptions] = useState<ISelectOption<IHasId<IForm>>[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<ISelectOption<IHasId<IForm>>>();
  const teamId = useTeamId();
  const forms = useForms({ text, teamId });

  useEffect(() => {
    if (!forms.loading) {
      const options: ISelectOption<IHasId<IForm>>[] = (
        forms.data?.data || []
      ).map((v) => makeOption(v));
      setOptions(options);
    }
  }, [forms.loading, forms.data]);

  useEffect(() => {
    const option = options.find((v) => String(v.value._id) === String(value));
    if (option && String(option.value._id) !== String(value)) {
      setSelectedOption(option);
      setInputValue(option?.value?.name || '');
      return;
    }

    if (value) {
      const fetchData = async () => {
        const form = await postApiFormsFindOne({ _id: value, teamId });
        if (form) {
          setSelectedOption(makeOption(form));
          setInputValue(form.name);
        }
      };
      fetchData();
      return;
    }

    setSelectedOption(undefined);
    setInputValue('');
  }, [value]);

  function onInputBlur() {
    if (selectedOption && inputValue !== selectedOption.value.name) {
      setInputValue(selectedOption.value.name);
    }
  }

  function onClickClear() {
    setSelectedOption(undefined);
    setInputValue('');
    onChange(null);
  }

  function onChangeSelected(option: ISelectOption<IHasId<IForm>> | null) {
    if (!option) {
      // setSelectedOption(undefined);
      // setInputValue('');
      // onChange(null);
      return;
    }
    setSelectedOption(option);
    setInputValue(option?.value?.name || '');
    onChange(option.value._id);
  }

  return (
    <DynamicCombobox<IHasId<IForm>, F>
      field={field}
      errors={errors}
      options={options}
      value={selectedOption}
      onChange={onChangeSelected}
      inputValue={inputValue}
      onInputChange={(event) => setInputValue(event.target.value)}
      onInputBlur={onInputBlur}
      comparison={(value, option) => {
        return String(value?.value._id) === String(option.value._id);
      }}
      clearable={clearable}
      onClickClear={onClickClear}
    />
  );
}
