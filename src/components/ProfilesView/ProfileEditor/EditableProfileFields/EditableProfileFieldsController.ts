import { IEditableProfileFields } from '@/types/Profile';
import { ChangeEvent } from 'react';
import FormController from '@/util/FormController';
import { z } from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';

export interface IForm extends IEditableProfileFields {}

export function defaultForm(): IEditableProfileFields {
  return {
    name: 'New Profile',
    favorite: false,
  };
}

const formValidator = () =>
  z.object({
    name: zStringRequiredValidator,
    favorite: z.boolean(),
  }) satisfies z.ZodType<IEditableProfileFields>;

export class EditableProfileFieldsController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeFavorite = () => {
    this.onChangeForm({ favorite: !this.form.favorite });
  };
}
