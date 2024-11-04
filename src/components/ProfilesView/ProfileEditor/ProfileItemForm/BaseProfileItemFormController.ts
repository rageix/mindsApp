import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { EProfileItemType, IProfileItem } from '@/types/Profile';

export interface IForm extends IProfileItem {}

export function defaultForm(): IForm {
  return {
    canDelete: true,
    canDisable: true,
    enabled: true,
    type: EProfileItemType.Email,
    value: '',
    label: '',
  };
}

export default class BaseProfileItemFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  // formValidator = () => baseProfileItemFormValidator;

  onChangeEnabled = () => {
    this.onChangeForm({ enabled: !this.form.enabled });
  };

  onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    let update: Partial<IForm>;
    if (this.form.value === this.form.label) {
      update = {
        value: e.target.value,
        label: e.target.value,
      };
    } else {
      update = {
        value: e.target.value,
      };
    }
    this.onChangeForm(update);
  };

  onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    let update: Partial<IForm>;
    if (this.form.value === this.form.label) {
      update = {
        value: e.target.value,
        label: e.target.value,
      };
    } else {
      update = {
        label: e.target.value,
      };
    }
    this.onChangeForm(update);
  };
}
