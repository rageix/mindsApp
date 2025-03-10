import { IRBLanguage, newIRBLanguage } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBLanguage {}

export function defaultForm(): IForm {
  return newIRBLanguage();
}

export default class LanguageFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLanguage = (value: string | null) => {
    this.onChangeForm({ language: value || '' });
  };

  onChangeLevel = (value: string | null) => {
    this.onChangeForm({ level: value || '' });
  };
}
