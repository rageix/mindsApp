import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBEducation,
  newIRBEducation
} from '@/types/ResumeBuilder';

export interface IForm extends IRBEducation {}

export function defaultForm(): IForm {
  return newIRBEducation();
}

export default class EducationFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeSchool = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ school: e.target.value });
  };

  onChangeDegree = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ degree: e.target.value });
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
