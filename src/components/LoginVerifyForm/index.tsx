'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import tokenService from '@/services/TokenService';
import userService from '@/services/UserService';
import LoginVerifyFormController, {IForm}
  from '@/components/LoginVerifyForm/LoginVerifyFormController';
import { postApiUserLoginVerify } from '@/requests/api/user/login/verify';

interface IProps {
  verifyKey: string,
  rememberMe: boolean
}
export default function LoginVerifyForm({verifyKey, rememberMe}: IProps) {
  const [controller] = useState(new LoginVerifyFormController());
  const router = useRouter();
  controller.useController(async (form) => {
    const response = await postApiUserLoginVerify({ ...form, key: verifyKey });

    if (response && response.accessToken) {
      tokenService.save(response.accessToken, rememberMe);
      userService.reload();
      router.push('/dashboard');
    }
  });

  const { form, state } = controller;

  return (
    <Form
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel<IForm> field="code">Code</FormLabel>
        <Input<IForm>
          field="code"
          errors={state.errors}
          value={form.code}
          autoComplete="code"
          onChange={controller.onChangeCode}
        />
        <FormErrors<IForm>
          field="code"
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
          Verify
        </Button>
      </div>
    </Form>
  );
}
