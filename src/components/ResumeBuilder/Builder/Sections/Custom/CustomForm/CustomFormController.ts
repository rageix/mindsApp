import { ChangeEvent } from 'react';
import { IRBCustom, IRBDate, newIRBCustom } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBCustom {}

export function defaultForm(): IForm {
  return newIRBCustom();
}

export default class CustomFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

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
