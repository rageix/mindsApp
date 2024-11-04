import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { ETextItemType, ITextItem } from '@/types/Profile';

export interface IForm extends ITextItem {}

export function defaultForm(): IForm {
  return {
    canDelete: true,
    canDisable: true,
    enabled: true,
    fieldName: '',
    type: ETextItemType.Input,
    value: '',
  };
}

const formValidator = () =>
  z
    .object({
      canDelete: z.boolean(),
      canDisable: z.boolean(),
      enabled: z.boolean(),
      fieldName: z.string(),
      type: z.nativeEnum(ETextItemType),
      value: z.string(),
    })
    .refine(
      (data) => {
        if (!data.enabled) {
          return true;
        }
        return data.enabled && data.value.length > 0;
      },
      {
        path: ['value'],
        message: 'An active field must not be empty',
      },
    ) satisfies z.ZodType<IForm>;

export default class TextItemFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeEnabled = () => {
    this.onChangeForm({ enabled: !this.form.enabled });
  };

  onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.onChangeForm({ value: e.target.value });
  };
}
