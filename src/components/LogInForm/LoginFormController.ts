import FormController from '@/util/FormController';
import { z } from 'zod';
import { zEmailValidator } from '@/util/Validators';
import { ChangeEvent } from 'react';
import { ILoginRequest } from '@/requests/api/user/login/Schema';

export interface ILoginForm extends ILoginRequest {
  rememberMe: boolean;
}

export interface IForm extends ILoginForm {}

export function defaultForm(): IForm {
  return {
    email: '',
    password: '',
    rememberMe: true,
  };
}

const formValidator: z.ZodType<IForm> = z.object({
  email: zEmailValidator,
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export default class LoginFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ password: e.target.value });
  };

  onChangeRememberMe = () => {
    this.onChangeForm({ rememberMe: !this.form.rememberMe });
  };
}
