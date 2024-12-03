import Input from '@/components/Input';
import FieldController, {
  IForm,
} from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';

interface IProps {
  controller: FieldController;
}

export default function FieldInput({ controller }: IProps) {
  // controller.useController();
  const { state, form, field } = controller;

  console.log(form);

  return (
    <Input<IForm>
      errors={state.errors}
      value={form.values?.[0]?.value || ''}
      onChange={controller.onChangeInput}
      placeholder={field.placeholder}
    />
  );
}
