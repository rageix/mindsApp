import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IResumesFilter } from '@/requests/api/resumes/paginated/schema';

export interface IForm extends Pick<IResumesFilter, 'text'> {}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

export default class ResumesFiltersController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ text: e.target.value });
  };
}
