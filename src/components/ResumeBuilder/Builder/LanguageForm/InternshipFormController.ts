import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBLanguage, newIRBLanguage } from '@/types/ResumeBuilder';

export interface IForm extends IRBLanguage {}

export function defaultForm(): IForm {
  return newIRBLanguage();
}

export default class LanguageFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ language: e.target.value });
  };
}
