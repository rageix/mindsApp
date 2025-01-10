import { ChangeEvent } from 'react';
import { ERBSkillLevel, IRBSkill, newIRBSkill } from '@/types/ResumeBuilder';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBSkill {}

export function defaultForm(): IForm {
  return newIRBSkill();
}

export default class SkillFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeSkill = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ skill: e.target.value });
  };

  onChangeLevel = (value: ERBSkillLevel | null) => {
    this.onChangeForm({ level: value });
  };
}
