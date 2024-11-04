'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import FormLabel from '@/components/FormLabel';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordResetIdFormController, {
  IForm,
} from '@/components/PasswordResetIdForm/PasswordResetIdFormController';
import _ from 'lodash';
import Form from '@/components/Form';
import { postApiUserPasswordResetReset } from '@/requests/api/user/passwordReset/reset';
import Button from '@/components/Buttton';

export default function PasswordResetIdForm() {
  const [controller] = useState(new PasswordResetIdFormController());
  const params = useParams<{ id: string }>();
  const router = useRouter();

  controller.useController(async (values) => {
    const response = await postApiUserPasswordResetReset({
      password: values.password,
      id: params.id,
    });

    if (response) {
      router.push('/passwordReset/success');
    }
  });

  const { form, state } = controller;

  return (
    <Form
      data-testid="passwordResetIdForm"
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel<IForm> field="password">Password</FormLabel>
        <Input<IForm>
          field="password"
          errors={state.errors}
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={controller.onChangePassword}
        />
        <FormErrors<IForm>
          field="password"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="passwordAgain">Password (Again)</FormLabel>
        <Input<IForm>
          field="passwordAgain"
          type="password"
          autoComplete="new-password"
          value={form.passwordAgain}
          onChange={controller.onChangePasswordAgain}
        />
        <FormErrors<IForm>
          field="passwordAgain"
          errors={state.errors}
        />
      </div>

      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
        >
          Reset password
        </Button>
      </div>
    </Form>
  );
}
