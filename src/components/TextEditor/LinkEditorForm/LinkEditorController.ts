import { ChangeEvent } from 'react';
import { ILinkEditor, newILinkEditor } from '@/types/LinkEditor';
import FormController from '@/util/FormController';

export interface IForm extends ILinkEditor {}

export function defaultForm(): IForm {
  return newILinkEditor();
}

export default class LinkEditorController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ url: e.target.value });
  };

  onClearUrl = () => {
    this.onChangeForm({ url: '' });
  }
}
