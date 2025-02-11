import { ChangeEvent } from 'react';
import { ERBSkillLevel, IRBSkill, newIRBSkill } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBSkill {}

export function defaultForm(): IForm {
  return newIRBSkill();
}

export default class SkillFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeSkill = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ skill: e.target.value });
  };

  onChangeLevel = (value: ERBSkillLevel | null) => {
    this.onChangeForm({ level: value });
  };
}
