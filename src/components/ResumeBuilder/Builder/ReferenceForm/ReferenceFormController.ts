import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBReference, newIRBReference } from '@/types/ResumeBuilder';

export interface IForm extends IRBReference {}

export function defaultForm(): IForm {
  return newIRBReference();
}

export default class ReferenceFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeCompany = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ company: e.target.value });
  };

  onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ phone: e.target.value });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };
}
