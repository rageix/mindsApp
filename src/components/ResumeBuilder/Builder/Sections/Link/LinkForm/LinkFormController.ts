import { ChangeEvent } from 'react';
import { IRBLink, newIRBLink } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBLink {}

export function defaultForm(): IForm {
  return newIRBLink();
}

export default class LinkFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ label: e.target.value });
  };

  onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ link: e.target.value });
  };
}
