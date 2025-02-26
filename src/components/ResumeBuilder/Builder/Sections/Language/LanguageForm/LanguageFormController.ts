import { ChangeEvent } from 'react';
import { ERBLanguageLevel, IRBLanguage, newIRBLanguage } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';

export interface IForm extends IRBLanguage {}

export function defaultForm(): IForm {
  return newIRBLanguage();
}

export default class LanguageFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ language: e.target.value });
  };

  onChangeLevel = (value: ERBLanguageLevel | null) => {
    this.onChangeForm({ level: value });
  };
}
