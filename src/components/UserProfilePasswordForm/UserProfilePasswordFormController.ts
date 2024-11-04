import FormController from '@/util/FormController';
import { z } from 'zod';
import { passwordValidatorSchema } from '@/util/Validators';
import { ChangeEvent } from 'react';
import { IUserCurrentPasswordUpdateRequest } from '@/requests/api/user/current/password/Schema';

export interface IForm extends IUserCurrentPasswordUpdateRequest {}

export function defaultForm(): IForm {
  return {
    password: '',
  };
}

const formValidator: z.ZodType<IForm> = z.object({
  password: passwordValidatorSchema,
});

export default class UserProfilePasswordFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ password: e.target.value });
  };
}
