import { ChangeEvent } from 'react';
import FormController from '@/util/FormController';

export interface IForm {
  name: string;
}

export function defaultForm(): IForm {
  return {
    name: '',
  };
}

export default class RenameFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  // onChangeForm = (update: Partial<IForm>, validate = true) => {
  //   emitter.emitResumeUpdated();
  //   return this._onChangeForm(update, validate);
  // };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };
}
