import { ChangeEvent } from 'react';
import { ISectionTitle } from '@/types/Resume';
import FormController from '@/util/FormController';

export interface IForm extends ISectionTitle {}

export function defaultForm(): IForm {
  return {
    title: '',
  };
}

export default class TitleFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };
}
