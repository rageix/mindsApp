import FormController from '@/util/FormController';
import { z } from 'zod';
import { zEmailValidator } from '@/util/Validators';
import { ChangeEvent } from 'react';
import { IUserProfileProfileUpdateRequest } from '@/requests/api/user/current/Schema';

export interface IForm extends IUserProfileProfileUpdateRequest {}

export function defaultForm(): IForm {
  return {
    name: '',
    email: '',
  };
}

const formValidator: z.ZodType<IForm> = z.object({
  name: z.string().min(1),
  email: zEmailValidator,
});

export default class UserAccountFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };
}
