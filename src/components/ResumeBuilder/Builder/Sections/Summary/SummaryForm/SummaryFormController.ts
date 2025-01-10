import { IRBSummary, newIRBSummary } from '@/types/ResumeBuilder';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBSummary {}

export function defaultForm(): IForm {
  return newIRBSummary();
}

export default class SummaryFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
