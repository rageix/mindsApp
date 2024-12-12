import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IFormFilter } from '@/requests/api/forms/paginated/schema';

export interface IForm extends Pick<IFormFilter, 'text'> {}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

export default class FormFiltersController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ text: e.target.value });
  };
}
