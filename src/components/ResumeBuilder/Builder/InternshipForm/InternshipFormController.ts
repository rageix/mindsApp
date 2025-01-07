import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBInternship,
  newIRBInternship,
} from '@/types/ResumeBuilder';

export interface IForm extends IRBInternship {}

export function defaultForm(): IForm {
  return newIRBInternship();
}

export default class InternshipFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

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

  onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ description: e.target.value });
  };
}
