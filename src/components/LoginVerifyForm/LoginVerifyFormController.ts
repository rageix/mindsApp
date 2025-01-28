import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { ILoginVerifyRequest } from '@/requests/api/user/login/verify/Schema';

export interface IForm extends ILoginVerifyRequest {}

export function defaultForm(): IForm {
  return {
    key: '',
    code: '',
  };
}

const formValidator = z.object({
  key: z.string(),
  code: z.string().length(6),
}) satisfies z.ZodType<IForm>;

export default class LoginVerifyFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ code: e.target.value.trim() });
  };
}
