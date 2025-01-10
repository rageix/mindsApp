import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBInternship,
  newIRBInternship,
} from '@/types/ResumeBuilder';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBInternship {}

export function defaultForm(): IForm {
  return newIRBInternship();
}

export default class InternshipFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeIsExpanded = () => {
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };

  onChangeEmployer = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ employer: e.target.value });
  };

  onChangeStart = (value: IRBDate | null) => {
    this.onChangeForm({ start: value });
  };

  onChangeEnd = (value: IRBDate | null) => {
    this.onChangeForm({ end: value });
  };

  onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ city: e.target.value });
  };

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
