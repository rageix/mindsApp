import Input from '@/components/Input';
import FieldController, {
  IForm,
} from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';

interface IProps {
  controller: FieldController;
}

export default function FieldDate({ controller }: IProps) {
  // controller.useController();
  const { state, form, field } = controller;

  return (
    <Input<IForm>
      type="date"
      errors={state.errors}
      value={form.values?.[0]?.label || ''}
      onChange={controller.onChangeDate}
      placeholder={field.placeholder}
    />
  );
}
