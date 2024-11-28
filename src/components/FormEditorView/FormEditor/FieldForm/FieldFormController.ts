import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { EFieldType, IField, newIFieldOption } from '@/types/Form';
import { nanoid } from 'nanoid';
import { fieldSchema } from '@/common/DynamicForms';
import { ISelectOption } from '@/types/SelectOption';

export interface IForm extends IField {}

export function defaultForm(): IForm {
  return {
    key: nanoid(),
    type: EFieldType.Input,
    label: '',
    isRequired: true,
    selectOptions: [],
    placeholder: '',
  };
}

const formValidator = () => fieldSchema satisfies z.ZodType<IForm>;

export default class FieldFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = this.resetForm;
  formValidator = formValidator;

  onChangeType = (type: EFieldType) => {
    this.onChangeForm({ type });
  };

  onChangeLabel = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.onChangeForm({ label: e.target.value });
  };

  onChangeIsRequired = () => {
    this.onChangeForm({ isRequired: !this.form.isRequired });
  };

  onChangeSelectOptions = (options: ISelectOption<string>[]) => {
    this.onChangeForm({ selectOptions: options });
  };

  onChangeOptionsMinLength = (value: number) => {
    this.onChangeForm({ minLength: value });
  };

  onChangeOptionsMaxLength = (value: number) => {
    this.onChangeForm({ maxLength: value });
  };

  onChangePlaceholder = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({
      placeholder: e.target.value,
    });
  };

  onChangeOptionValue = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const options = [...this.form.selectOptions];
    options[index].value = e.target.value;
    this.onChangeForm({ selectOptions: options });
  };

  onClickAddOption = () => {
    let key: string;

    while (true) {
      key = nanoid();
      if (this.form.selectOptions.findIndex((v) => v.key === key) === -1) {
        break;
      }
    }

    const option = newIFieldOption();
    option.key = key;
    this.onChangeForm({
      selectOptions: [...this.form.selectOptions, option],
    });
  };

  onClickRemoveOption = (index: number) => {
    this.onChangeForm({
      selectOptions: this.form.selectOptions.toSpliced(index, 1),
    });
  };

  onClickMoveOptionUp = (index: number) => {
    if (index === 0) {
      return;
    }

    const options = [...this.form.selectOptions];
    const spliced = options.splice(index, 1);
    options.splice(index - 1, 0, spliced[0]);
    this.onChangeForm({ selectOptions: options });
  };

  onClickMoveOptionDown = (index: number) => {
    if (index >= this.form.selectOptions.length - 1) {
      return;
    }

    const options = [...this.form.selectOptions];
    const spliced = options.splice(index, 1);
    options.splice(index + 1, 0, spliced[0]);
    this.onChangeForm({ selectOptions: options });
  };
}
