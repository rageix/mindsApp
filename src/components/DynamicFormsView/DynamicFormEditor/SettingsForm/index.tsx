'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import SettingsFormController, { IForm } from './SettingsFormController';
import Checkbox from '@/components/Checkbox';

interface IProps {
  controller: SettingsFormController;
}

export default function SettingsForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div className="space-y-6">
      <div>
        <FormLabel<IForm> field="name">Name</FormLabel>
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
      <div className="flex items-center">
        <Checkbox<IForm>
          field="isActive"
          errors={state.errors}
          checked={form.isActive}
          onChange={controller.onChangeIsActive}
        />
        <FormLabel<IForm>
          field="isActive"
          className="ml-3"
        >
          Is Active
        </FormLabel>
      </div>
    </div>
  );
}
