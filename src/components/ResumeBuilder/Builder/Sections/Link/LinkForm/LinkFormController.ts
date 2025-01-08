import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBLink, newIRBLink } from '@/types/ResumeBuilder';

export interface IForm extends IRBLink {}

export function defaultForm(): IForm {
  return newIRBLink();
}

export default class LinkFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ label: e.target.value });
  };

  onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ link: e.target.value });
  };
}
