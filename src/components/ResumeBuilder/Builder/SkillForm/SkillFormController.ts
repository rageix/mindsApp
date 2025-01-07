import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { ERBSkill, IRBSkill, newIRBSkill } from '@/types/ResumeBuilder';

export interface IForm extends IRBSkill {}

export function defaultForm(): IForm {
  return newIRBSkill();
}

export default class SkillFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ label: e.target.value });
  };

  onChangeLevel = (value: ERBSkill | null) => {
    this.onChangeForm({ level: value });
  };
}
