import FormController from '@/util/FormController';
import { z } from 'zod';
import { zEmailValidator } from '@/util/Validators';
import { ChangeEvent } from 'react';

export interface ISignUpForm {
  email: string;
  terms: boolean;
}

export interface IForm extends ISignUpForm {}

export function defaultForm(): IForm {
  return {
    email: '',
    terms: false,
  };
}

const formValidator = () =>
  z.object({
    email: zEmailValidator,
    terms: z.boolean().refine(
      (val) => {
        return val;
      },
      {
        message: 'You must accept the terms before creating an account.',
      },
    ),
  }) satisfies z.ZodType<IForm>;

export default class RegisterFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };

  onChangeTerms = () => {
    this.onChangeForm({ terms: !this.form.terms });
  };
}
