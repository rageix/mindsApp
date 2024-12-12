'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import { useState } from 'react';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';

import { toast } from 'react-toastify';
import UserProfilePasswordFormController, {
  IForm,
} from '@/components/UserProfilePasswordForm/UserProfilePasswordFormController';
import { postApiUserCurrentPassword } from '@/requests/api/user/current/password';
import Form from '@/components/Form';

export default function UserProfilePasswordForm() {
  const [controller] = useState(new UserProfilePasswordFormController());
  controller.useController(async (form) => {
    const response = await postApiUserCurrentPassword(form);

    if (!response) {
      return;
    }

    toast.success('Your password was updated.');
    controller.reset();
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="password">Password</FormLabel>
        <Input<IForm>
          type="password"
          field="password"
          autoComplete="new-password"
          errors={state.errors}
          value={form.password}
          onChange={controller.onChangePassword}
        />
        <FormErrors<IForm>
          field="password"
          errors={state.errors}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          Save
        </Button>
      </div>
    </Form>
  );
}
