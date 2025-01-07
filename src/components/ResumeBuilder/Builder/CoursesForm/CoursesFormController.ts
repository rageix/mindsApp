import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBCourse, IRBDate, newIRBCourse } from '@/types/ResumeBuilder';

export interface IForm extends IRBCourse {}

export function defaultForm(): IForm {
  return newIRBCourse();
}

export default class CoursesFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeInstitution = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ institution: e.target.value });
  };

  onChangeStart = (value: IRBDate | null) => {
    this.onChangeForm({ start: value });
  };

  onChangeEnd = (value: IRBDate | null) => {
    this.onChangeForm({ end: value });
  };

  onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ description: e.target.value });
  };
}
