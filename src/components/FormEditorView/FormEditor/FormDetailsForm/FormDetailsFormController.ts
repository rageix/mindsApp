import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { zStringRequiredValidator } from '@/util/Validators';
import { IFormDetails } from "@/types/Form";

export interface IForm extends IFormDetails {}

export function defaultForm(): IForm {
  return {
    name: 'New Form',
    isActive: true
  };
}

const formValidator = () =>
  z.object({
    name: zStringRequiredValidator,
    isActive: z.boolean(),
  }) satisfies z.ZodType<IForm>;

export default class FormDetailsFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeIsActive = () => {
    this.onChangeForm({ isActive: !this.form.isActive });
  };
}
