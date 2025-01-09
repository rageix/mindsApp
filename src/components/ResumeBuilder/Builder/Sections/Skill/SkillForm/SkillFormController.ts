import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { ERBSkillLevel, IRBSkill, newIRBSkill } from '@/types/ResumeBuilder';

export interface IForm extends IRBSkill {}

export function defaultForm(): IForm {
  return newIRBSkill();
}

export default class SkillFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeSkill = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ skill: e.target.value });
  };

  onChangeLevel = (value: ERBSkillLevel | null) => {
    this.onChangeForm({ level: value });
  };
}
