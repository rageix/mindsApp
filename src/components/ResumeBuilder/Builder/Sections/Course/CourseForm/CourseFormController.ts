import { ChangeEvent } from 'react';
import { IRBCourse, IRBDate, newIRBCourse } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBCourse {}

export function defaultForm(): IForm {
  return newIRBCourse();
}

export default class CourseFormController extends SectionItemController<IForm> {
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

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
