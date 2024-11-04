import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { passwordValidatorSchema } from '@/util/Validators';

export interface IForm {
  password: string;
  passwordAgain: string;
}

export function defaultForm(): IForm {
  return {
    password: '',
    passwordAgain: '',
  };
}

const formValidator: (form: IForm) => z.ZodType<IForm> = (form: IForm) =>
  z.object({
    password: passwordValidatorSchema.refine(
      (val: string) => {
        return val === form.passwordAgain;
      },
      {
        message: 'Password must match Password (Again)',
      },
    ),
    passwordAgain: passwordValidatorSchema.refine(
      (val: string) => {
        return val === form.password;
      },
      {
        message: 'Password (Again) must match Password.',
      },
    ),
  });

export default class PasswordResetIdFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ password: e.target.value });
  };
  onChangePasswordAgain = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ passwordAgain: e.target.value });
  };
}
