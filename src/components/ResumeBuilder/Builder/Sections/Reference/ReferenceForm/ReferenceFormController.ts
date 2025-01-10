import { ChangeEvent } from 'react';
import { IRBReference, newIRBReference } from '@/types/ResumeBuilder';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBReference {}

export function defaultForm(): IForm {
  return newIRBReference();
}

export default class ReferenceFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeByRequestOnly = () => {
    this.onChangeForm({ byRequestOnly: !this.form.byRequestOnly });
  };

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
