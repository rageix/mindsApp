import { ChangeEvent } from 'react';
import { IRBLink, newIRBLink } from '@/types/ResumeBuilder';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBLink {}

export function defaultForm(): IForm {
  return newIRBLink();
}

export default class LinkFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ label: e.target.value });
  };

  onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ link: e.target.value });
  };
}
