import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBEmployment,
  newIRBEmployment,
} from '@/types/ResumeBuilder';

export interface IForm extends IRBEmployment {}

export function defaultForm(): IForm {
  return newIRBEmployment();
}

export default class EmploymentFormController extends FormController<IForm> {
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

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
