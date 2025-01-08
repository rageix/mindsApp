import FormController from '@/util/FormController';
import { IRBSummary, newIRBSummary } from '@/types/ResumeBuilder';

export interface IForm extends IRBSummary {}

export function defaultForm(): IForm {
  return newIRBSummary();
}

export default class SummaryFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
