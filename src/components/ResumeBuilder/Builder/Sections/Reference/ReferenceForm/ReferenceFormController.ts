import { ChangeEvent } from 'react';
import { IRBReference, newIRBReference } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBReference {}

export function defaultForm(): IForm {
  return newIRBReference();
}

export default class ReferenceFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

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
