import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { ITeamsPostRequest } from '@/requests/api/teams/schema';
import { zStringRequiredValidator } from '@/util/Validators';

export interface IForm extends ITeamsPostRequest {}

export function defaultForm(): IForm {
  return {
    _id: '',
    name: '',
  };
}

const formValidator = () =>
  z.object({
    _id: z.string(),
    name: zStringRequiredValidator,
  }) satisfies z.ZodType<IForm>;

export default class TeamFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };
}
