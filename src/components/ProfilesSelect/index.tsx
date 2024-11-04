import { MongoId } from '@/types/MongoDocument';
import { useEffect, useState } from 'react';
import useProfiles from '@/hooks/UseProfiles';
import useTeamId from '@/hooks/UseTeamId';
import { ISelectOption } from '@/types/SelectOption';
import DynamicCombobox from '@/components/DynamicCombobox';
import { IProfile } from '@/types/Profile';
import { IHasId } from '@/types/HasId';
import ProfileItem from '@/components/ProfilesSelect/ProfileItem';
import { useDebounce } from 'use-debounce';
import { postApiProfilesFindOne } from '@/requests/api/profiles/findOne';

function makeOption(
  profile: IHasId<IProfile>,
): ISelectOption<IHasId<IProfile>> {
  return {
    key: String(profile._id),
    value: profile,
    label: <ProfileItem value={profile} />,
  };
}

interface IProps<F> {
  field?: keyof F;
  errors?: Record<keyof F, string[]>;
  onChange: (_id: MongoId | null) => void;
  value?: MongoId | null;
  clearable?: boolean;
}

export default function ProfilesSelect<F>({
  field,
  errors,
  onChange,
  value,
  clearable,
}: IProps<F>) {
  const [inputValue, setInputValue] = useState('');
  const [text] = useDebounce(inputValue, 400);
  const [options, setOptions] = useState<ISelectOption<IHasId<IProfile>>[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<ISelectOption<IHasId<IProfile>>>();
  const teamId = useTeamId();
  const profiles = useProfiles({ text, teamId });

  useEffect(() => {
    if (!profiles.loading) {
      const options: ISelectOption<IHasId<IProfile>>[] = (
        profiles.data?.data || []
      ).map((v) => makeOption(v));
      setOptions(options);
    }
  }, [profiles.loading, profiles.data]);

  useEffect(() => {
    const option = options.find((v) => String(v.value._id) === String(value));
    if (option && String(option.value._id) !== String(value)) {
      setSelectedOption(option);
      setInputValue(option?.value?.name || '');
      return;
    }

    if (value) {
      const fetchData = async () => {
        const profile = await postApiProfilesFindOne({ _id: value, teamId });
        if (profile) {
          setSelectedOption(makeOption(profile));
          setInputValue(profile.name);
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

  function onChangeSelected(option: ISelectOption<IHasId<IProfile>> | null) {
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
    <DynamicCombobox<IHasId<IProfile>, F>
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
