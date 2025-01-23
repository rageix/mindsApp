import { EResumeFonts, ETemplate, IRBStyle, newIRBStyle } from '@/types/Resume';
import FormController from '@/util/FormController';

export interface IForm extends IRBStyle {}

export function defaultForm(): IForm {
  return newIRBStyle();
}

export default class StyleController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeTemplate = (value: ETemplate) => {
    this.onChangeForm({ template: value });
  };

  onChangeFontFamily = (value: EResumeFonts) => {
    this.onChangeForm({ fontFamily: value });
  };

  onChangePrimaryColor = (value: string) => {
    this.onChangeForm({ primaryColor: value });
  };

  onChangeSecondaryColor = (value: string) => {
    this.onChangeForm({ secondaryColor: value });
  };

  onChangeLineHeight = (value: number) => {
    this.onChangeForm({ lineHeight: value });
  };

  onChangeScale = (value: number) => {
    this.onChangeForm({ scale: value });
  };
}
