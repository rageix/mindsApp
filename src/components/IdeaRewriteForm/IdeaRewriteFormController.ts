import { ChangeEvent } from 'react';
import FormController from '@/util/FormController';

export interface IForm {
  text: string;
}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

export default class IdeaRewriteFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  // onChangeForm = (update: Partial<IForm>, validate = true) => {
  //   emitter.emitResumeUpdated();
  //   return this._onChangeForm(update, validate);
  // };

  onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ text: e.target.value });
  };
}
