import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBSummary, newIRBSummary } from '@/types/ResumeBuilder';

export interface IForm extends IRBSummary {}

export function defaultForm(): IForm {
  return newIRBSummary();
}

export default class SummaryFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ description: e.target.value });
  };
}
