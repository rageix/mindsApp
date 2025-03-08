import { ChangeEvent } from 'react';
import { IRBDate, IRBEmployment, newIRBEmployment } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBEmployment {}

export function defaultForm(): IForm {
  return newIRBEmployment();
}

export default class EmploymentFormController extends SectionItemController<IForm> {
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
    if(value === null) {
      emitter.emitSaveResume();
    }
  };

  onChangeEnd = (value: IRBDate | null) => {
    this.onChangeForm({ end: value });
    if(value === null) {
      emitter.emitSaveResume();
    }
  };

  onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ city: e.target.value });
  };

  onChangeState = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ state: e.target.value });
  };

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
