import FieldController, {
  IForm,
} from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';
import Textarea from '@/components/Textarea';

interface IProps {
  controller: FieldController;
}

export default function FieldTextarea({ controller }: IProps) {
  // controller.useController();
  const { state, form } = controller;

  return (
    <Textarea<IForm>
      errors={state.errors}
      value={form.values?.[0]?.value || ''}
      onChange={controller.onChangeTextArea}
    />
  );
}
