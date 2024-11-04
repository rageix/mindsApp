import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { zEmailValidator } from '@/util/Validators';

export interface PasswordResetForm {
  email: string;
}

export interface IForm extends PasswordResetForm {}

export function defaultForm(): IForm {
  return {
    email: '',
  };
}

const formValidator: z.ZodType<IForm> = z.object({
  email: zEmailValidator,
});

export default class PasswordResetFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };
}
