import { ERBSkillLevel, IRBSkill, newIRBSkill } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBSkill {}

export function defaultForm(): IForm {
  return newIRBSkill();
}

export default class SkillFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeSkill = (value: string) => {
    this.onChangeForm({ skill: value });
  };

  // onChangeSkill = (e: ChangeEvent<HTMLInputElement>) => {
  //   this.onChangeForm({ skill: e.target.value });
  // };

  onChangeLevel = (value: ERBSkillLevel | null) => {
    this.onChangeForm({ level: value });
  };
}
