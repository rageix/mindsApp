'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import Checkbox from '../Checkbox';
import { useState } from 'react';
import FormLabel from '@/components/FormLabel';
import LoginFormController, {
  IForm,
  ILoginForm,
} from '@/components/LoginForm/LoginFormController';
import _ from 'lodash';
import { postApiUserLogin } from '@/requests/api/user/login';
import Button from '@/components/Buttton';
import Form from '@/components/Form';

interface IProps {
  onSuccess: (accessCodeKey: string, rememberMe: boolean) => void
}

export default function LoginForm({onSuccess}: IProps) {
  const [controller] = useState(new LoginFormController());
  // const router = useRouter();
  controller.useController(async (form) => {
    const response = await postApiUserLogin(form);

    if (response && response.key) {
      onSuccess(response.key, form.rememberMe);
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
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
        >
          Log in
        </Button>
      </div>
    </Form>
  );
}
