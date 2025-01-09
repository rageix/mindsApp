import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBCustom, IRBDate, newIRBCustom } from '@/types/ResumeBuilder';

export interface IForm extends IRBCustom {}

export function defaultForm(): IForm {
  return newIRBCustom();
}

export default class CustomFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };

  onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ city: e.target.value });
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
