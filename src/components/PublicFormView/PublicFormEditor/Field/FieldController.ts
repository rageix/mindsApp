import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IField } from '@/types/Form';
import { ISelectOption } from '@/types/SelectOption';
import z from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import { IResponseField } from '@/types/FormResponse';

export interface IForm {
  value: string[];
}

export function defaultForm(): IForm {
  return {
    value: [],
  };
}

export default class FieldController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  field: IField;

  constructor(field: IField) {
    super();
    this.field = field;

    if (field.isRequired) {
      this.formValidator = () =>
        z.object({
          value: z.array(zStringRequiredValidator),
        });
    }
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ value: [e.target.value] });
  };

  onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ value: [e.target.value] });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ value: [e.target.value] });
  };

  onChangeFile = (value: string) => {
    this.onChangeForm({ value: [value] });
  };

  onChangeDate = (value: Date) => {
    this.onChangeForm({ value: [String(value)] });
  };

  onChangeSelect = (value: ISelectOption<string>) => {
    this.onChangeForm({ value: [value.value] });
  };

  onChangeRating = (value: number) => {
    this.onChangeForm({ value: [String(value)] });
  };

  getValue = (): IResponseField => {
    return {
      key: this.field.key,
      value: this.form.value
    };
  };
}
