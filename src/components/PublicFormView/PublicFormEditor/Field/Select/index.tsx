import FieldController from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';
import { useMemo } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';

interface IProps {
  controller: FieldController;
}

export default function FieldSelect({ controller }: IProps) {
  // controller.useController();
  const { state, form, field } = controller;

  const options: ISelectOption<string>[] = useMemo(() => {
    return controller.field.selectOptions.map((v) => {
      return {
        key: v.key,
        value: v.value,
        label: v.value,
      };
    });
  }, [controller.field.key]);

  return (
    <Select<string, never>
      errors={state.errors}
      options={options}
      value={
        (form.values?.[0] || {value: null, label: field.placeholder || 'Please chose...' }) as ISelectOption<string> | undefined
      }
      onChange={controller.onChangeSelect}
    />
  );
}
