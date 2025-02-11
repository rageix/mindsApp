import { EResumeFonts, ETemplate, IRBStyle, newIRBStyle } from '@/types/Resume';
import FormController from '@/util/FormController';
import emitter from '@/util/Emitter';

export interface IForm extends IRBStyle {}

export function defaultForm(): IForm {
  return newIRBStyle();
}

export default class StyleController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeForm = (update: Partial<IForm>, validate = true) => {
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeTemplate = (value: ETemplate) => {
    this.onChangeForm({ template: value });
  };

  onChangeFontFamily = (value: EResumeFonts) => {
    this.onChangeForm({ fontFamily: value });
  };

  onChangeTitleFontFamily = (value: EResumeFonts | null) => {
    this.onChangeForm({ titleFontFamily: value });
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
