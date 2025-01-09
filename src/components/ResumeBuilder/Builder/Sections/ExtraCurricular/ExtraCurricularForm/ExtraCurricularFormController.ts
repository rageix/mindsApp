import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBExtraCurricular,
  newIRBExtraCurricular,
} from '@/types/ResumeBuilder';

export interface IForm extends IRBExtraCurricular {}

export function defaultForm(): IForm {
  return newIRBExtraCurricular();
}

export default class ExtraCurricularFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
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
