'use client';
import FormErrors from '../FormErrors';
import FormLink from '../Link';
import Input from '../Input';
import Checkbox from '../Checkbox';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormLabel from '@/components/FormLabel';
import LoginFormController, {
  IForm,
  ILoginForm,
} from '@/components/LogInForm/LoginFormController';
import _ from 'lodash';
import { postApiUserLogin } from '@/requests/api/user/login';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import tokenService from '@/services/TokenService';
import userService from '@/services/UserService';

export default function LogInForm() {
  const [controller] = useState(new LoginFormController());
  const router = useRouter();
  controller.useController(async (form) => {
    const response = await postApiUserLogin(form);

    if (response && response.accessToken) {
      tokenService.save(response.accessToken, form.rememberMe);
      userService.reload();
      router.push('/dashboard');
    }
  });

  const { form, state } = controller;

  return (
    <Form
      data-testid="loginForm"
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel<IForm> field="email">Email</FormLabel>
        <Input<IForm>
          field="email"
          errors={state.errors}
          value={form.email}
          autoComplete="email"
          onChange={controller.onChangeEmail}
        />
        <FormErrors<ILoginForm>
          field="email"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="password">Password</FormLabel>
        <Input<IForm>
          type="password"
          field="password"
          autoComplete="current-password"
          value={form.password}
          onChange={controller.onChangePassword}
        />
        <FormErrors<IForm>
          field="password"
          errors={state.errors}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox<IForm>
            field="rememberMe"
            checked={form.rememberMe}
            onChange={controller.onChangeRememberMe}
          />
          <FormLabel<IForm>
            field="rememberMe"
            className="ml-3"
          >
            Remember me
          </FormLabel>
        </div>
        <div className="text-sm leading-6">
          <FormLink href="/passwordReset">Forgot password?</FormLink>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
        >
          Sign in
        </Button>
      </div>
    </Form>
  );
}
