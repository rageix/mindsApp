import { ChangeEvent } from 'react';
import { IResumeSettings, newIResumeSettings } from '@/types/Resume';
import FormController from '@/util/FormController';

export interface IForm extends IResumeSettings {}

export function defaultForm(): IForm {
  return newIResumeSettings();
}

export default class ResumeSettingsFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };
}
