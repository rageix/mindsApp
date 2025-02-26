import { ChangeEvent } from 'react';
import { IResumeSettings, newIResumeSettings } from '@/types/Resume';
import FormController from '@/util/FormController';
import emitter from '@/util/Emitter';

export interface IForm extends IResumeSettings {}

export function defaultForm(): IForm {
  return newIResumeSettings();
}

export default class ResumeSettingsFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  isDirty = false;

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    this.isDirty = true;
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onBlurInput = () => {
    if (this.isDirty) {
      emitter.emitSaveResume();
    }
  }
}
