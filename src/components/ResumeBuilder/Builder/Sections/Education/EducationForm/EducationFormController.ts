import { ChangeEvent } from 'react';
import { IRBDate, IRBEducation, newIRBEducation } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBEducation {}

export function defaultForm(): IForm {
  return newIRBEducation();
}

export default class EducationFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeIsExpanded = () => {
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };

  onChangeSchool = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ school: e.target.value });
  };

  onChangeDegree = (value: string | null) => {
    this.onChangeForm({ degree: value || '' });
  };

  onChangeMajor = (value: string | null) => {
    this.onChangeForm({ major: value || '' });
  };

  onChangeStart = (value: IRBDate | null) => {
    this.onChangeForm({ start: value });
    if (value === null) {
      emitter.emitSaveResume();
    }
  };

  onChangeEnd = (value: IRBDate | null) => {
    this.onChangeForm({ end: value });
    if (value === null) {
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
