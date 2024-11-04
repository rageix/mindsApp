'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormLabel from '@/components/FormLabel';
import PasswordResetFormController, {
  IForm,
} from '@/components/PasswordResetForm/PasswordResetFormController';
import _ from 'lodash';
import Form from '@/components/Form';
import Button from '@/components/Buttton';
import { postApiUserPasswordReset } from '@/requests/api/user/passwordReset';

export default function PasswordResetForm() {
  const [controller] = useState(new PasswordResetFormController());
  const router = useRouter();
  controller.useController(async (values) => {
    const response = await postApiUserPasswordReset(values);

    if (response) {
      router.push('/passwordReset/checkEmail');
    }
  });

  const { form, state } = controller;

  return (
    <Form
      data-testid="passwordResetForm"
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel<IForm> field="email">Email</FormLabel>
        <div className="mt-2">
          <Input
            field="email"
            errors={state.errors}
            value={form.email}
            onChange={controller.onChangeEmail}
          />
        </div>
        <FormErrors<IForm>
          field="email"
          errors={state.errors}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
        >
          Reset Password
        </Button>
      </div>
    </Form>
  );
}
