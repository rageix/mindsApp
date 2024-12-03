import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IField } from '@/types/Form';
import { ISelectOption } from '@/types/SelectOption';
import z from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import { IResponseField, IResponseValue } from '@/types/FormPublicRequest';
import { IFileUpload } from '@/types/FileUpload';
import dayjs from 'dayjs';

export interface IForm {
  values: IResponseValue[];
}

export function defaultForm(): IForm {
  return {
    values: [],
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
          values: z.array(z.object({ value: zStringRequiredValidator })).min(1, {message: 'Is required.'}),
        });
    }
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ values: [{ value: e.target.value }] });
  };

  onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ values: [{ value: e.target.value }] });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ values: [{ value: e.target.value }] });
  };

  onUploadFile = (files: IFileUpload[]) => {
    this.onChangeForm({
      values: (files || []).map((v) => {
        return {
          value: String(v._id),
          label: v.name,
        };
      }),
    });
  };

  onClickRemoveFile = (index: number) => {
    this.onChangeForm({
      values: this.form.values.toSpliced(index, 1),
    });
  };

  onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({
      values: [
        {
          value: dayjs(e.target.valueAsDate).unix(),
          label: e.target.value,
        },
      ],
    });
  };

  onChangeSelect = (value: ISelectOption<string>) => {
    this.onChangeForm({
      values: [
        {
          key: value.key,
          value: value.value,
          label: String(value.label),
        },
      ],
    });
  };

  onChangeRating = (value: number) => {
    this.onChangeForm({ values: [{ value: value }] });
  };

  getValue = (): IResponseField => {
    return {
      key: this.field.key,
      values: this.form.values,
    };
  };
}
