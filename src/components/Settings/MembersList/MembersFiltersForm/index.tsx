'use client';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import { useClose } from '@headlessui/react';
import MembersFiltersController, {
  IForm,
} from '@/components/Settings/MembersList/MembersFiltersForm/MembersFiltersController';
import { roleSelectOptions } from '@/common/SelectOptions';
import { EMemberRole } from '@/types/Member';
import EZDynamicCombobox from '@/components/EZDynamicCombobox';

interface IProps {
  controller: MembersFiltersController;
  onUpdate: () => void;
}

export default function MembersFiltersForm({ controller, onUpdate }: IProps) {
  const close = useClose();

  controller.useController(async () => {
    close();
    onUpdate();
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm>
          field="text"
          className="text-gray-900"
        >
          Text
        </FormLabel>
        <Input<IForm>
          field="text"
          errors={state.errors}
          value={form.text}
          onChange={controller.onChangeText}
        />
        <FormErrors<IForm>
          field="text"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm>
          field="role"
          className="text-gray-900"
        >
          Role
        </FormLabel>
        <EZDynamicCombobox<EMemberRole, IForm>
          field="role"
          options={roleSelectOptions}
          value={form.role}
          onChange={controller.onChangeRole}
          clearable
          // className="w-28 relative z-10"
        />
        <FormErrors<IForm>
          field="text"
          errors={state.errors}
        />
      </div>
      <div className="flex justify-end gap-x-3">
        <Button
          type="button"
          variant="text"
          disabled={!_.isEmpty(state.errors)}
          isInline
          onClick={() => controller.reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          Apply
        </Button>
      </div>
    </Form>
  );
}
