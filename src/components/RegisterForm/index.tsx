'use client';
import FormLink from '../Link';
import FormErrors from '../FormErrors';
import Input from '../Input';
import Checkbox from '../Checkbox';
import FormLabel from '@/components/FormLabel';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import RegisterFormController, {
  IForm,
} from '@/components/RegisterForm/RegisterFormController';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import { postApiUserRegister } from '@/requests/api/user/register';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const [controller] = useState(new RegisterFormController());
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  controller.useController(async (values) => {
    const response = await postApiUserRegister(values);

    if (response) {
      toast.success('Registration success. You can log into your account.');
      const redirect = !_.isEmpty(redirectTo)
        ? '?redirectTo=' + encodeURIComponent(String(redirectTo))
        : '';
      const loginUrl = '/login' + redirect;
      router.push(loginUrl);
    }
  });

  const { form, state } = controller;

  return (
    <Form
      data-testid="registerForm"
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
        <FormErrors<IForm>
          field="email"
          errors={state.errors}
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <Checkbox<IForm>
            field="terms"
            errors={state.errors}
            checked={form.terms}
            onChange={controller.onChangeTerms}
          />
          <FormLabel<IForm>
            field="terms"
            errors={state.errors}
            className="ml-3"
          >
            <span>I have read and accept the </span>
            <FormLink
              href="https://www.hobort.com/terms"
              target="_blank"
              aria-invalid={!_.isEmpty(state.errors.terms)}
            >
              terms of service
            </FormLink>
            .
          </FormLabel>
        </div>
        <FormErrors<IForm>
          field="terms"
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
          Create account
        </Button>
      </div>
    </Form>
  );
}
