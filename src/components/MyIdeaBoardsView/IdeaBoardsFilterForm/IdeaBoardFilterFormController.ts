import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IIdeaBoardFilter } from '@/requests/api/ideaBoards/paginated/schema';

export interface IForm extends Pick<IIdeaBoardFilter, 'text'> {}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

export default class IdeaBoardFilterFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ text: e.target.value });
  };
}
