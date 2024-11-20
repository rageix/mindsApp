import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { EFieldType, IField } from '@/types/DynamicForm';
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
  };
}

const formValidator = () => fieldSchema satisfies z.ZodType<IForm>;

export default class FieldController extends FormController<IForm> {
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

  onChangeOptionsIsEmail = () => {
    this.onChangeForm({
      isEmail: !this.form.isEmail,
    });
  };

  onChangeOptionsPlaceholder = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({
      placeholder: e.target.value,
    });
  };

  load = (field: IField) => {
    this.reset(field);
  };

  getValue = (): IField => {
    return this.form;
  };
}
