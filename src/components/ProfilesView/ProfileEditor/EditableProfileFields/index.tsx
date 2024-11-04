import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import {
  EditableProfileFieldsController,
  IForm,
} from '@/components/ProfilesView/ProfileEditor/EditableProfileFields/EditableProfileFieldsController';

interface IProps {
  controller: EditableProfileFieldsController;
}

export default function EditableProfileFields({ controller }: IProps) {
  controller.useController();
  const { form, state } = controller;

  return (
    <div>
      <FormLabel<IForm> field="name">Profile Name</FormLabel>
      <div className="mt-2">
        <Input<IForm>
          field="name"
          errors={state.errors}
          value={form.name}
          onChange={controller.onChangeName}
        />
      </div>
      <FormErrors<IForm>
        field="name"
        errors={state.errors}
      />
    </div>
  );
}
