import { IRBSummary, newIRBSummary } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBSummary {}

export function defaultForm(): IForm {
  return newIRBSummary();
}

export default class SummaryFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
