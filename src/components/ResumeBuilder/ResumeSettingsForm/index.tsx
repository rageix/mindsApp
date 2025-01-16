'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import ResumeSettingsFormController, {IForm}
  from '@/components/ResumeBuilder/ResumeSettingsForm/ResumeSettingsFormController';

interface IProps {
  controller: ResumeSettingsFormController
}


export default function ResumeSettingsForm({
  controller,
}: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <FormLabel<IForm> field="name">Name</FormLabel>
      <Input<IForm>
        field="name"
        errors={state.errors}
        value={form.name}
        onChange={controller.onChangeName}
      />
    </div>
  );
}
