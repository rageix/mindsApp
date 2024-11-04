import FormController from '@/util/FormController';
import { z } from 'zod';
import { zEmailValidator, passwordValidatorSchema } from '@/util/Validators';
import { ChangeEvent } from 'react';

export interface ISignUpForm {
  email: string;
  password: string;
  passwordAgain: string;
  terms: boolean;
}

export interface IForm extends ISignUpForm {}

export function defaultForm(): IForm {
  return {
    email: '',
    password: '',
    passwordAgain: '',
    terms: false,
  };
}

const formValidator = (form: IForm) =>
  z.object({
    email: zEmailValidator,
    password: passwordValidatorSchema.refine(
      (val) => {
        return val === form.passwordAgain;
      },
      {
        message: 'Password must match Password (Again)',
      },
    ),
    passwordAgain: passwordValidatorSchema.refine(
      (val) => {
        return val === form.password;
      },
      {
        message: 'Password (Again) must match Password.',
      },
    ),
    terms: z.boolean().refine(
      (val) => {
        return val;
      },
      {
        message: 'You must accept the terms before creating an account.',
      },
    ),
  });

export default class RegisterFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ password: e.target.value });
  };

  onChangePasswordAgain = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ passwordAgain: e.target.value });
  };

  onChangeTerms = () => {
    this.onChangeForm({ terms: !this.form.terms });
  };
}
