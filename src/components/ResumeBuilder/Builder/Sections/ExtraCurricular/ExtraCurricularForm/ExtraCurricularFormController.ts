import { ChangeEvent } from 'react';
import {
  IRBDate,
  IRBExtraCurricular,
  newIRBExtraCurricular,
} from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBExtraCurricular {}

export function defaultForm(): IForm {
  return newIRBExtraCurricular();
}

export default class ExtraCurricularFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeIsExpanded = () => {
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
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

  onChangeDescription = (value: string) => {
    this.onChangeForm({ description: value });
  };
}
