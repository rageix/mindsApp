import { ChangeEvent } from 'react';
import { ISectionTitle } from '@/types/Resume';
import FormController from '@/util/FormController';
import emitter from '@/util/Emitter';

export interface IForm extends ISectionTitle {}

export function defaultForm(): IForm {
  return {
    title: '',
  };
}

export default class TitleFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  // onChangeForm = (update: Partial<IForm>, validate = true) => {
  //   emitter.emitResumeUpdated();
  //   return this._onChangeForm(update, validate);
  // };

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };
}
